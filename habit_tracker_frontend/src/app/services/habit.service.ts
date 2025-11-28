import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Habit, HabitCompletion, HabitWithStats } from '../models/habit.model';
import { StorageUtil, todayKey, lastNDates } from '../utils/storage.util';
import { v4 as uuidv4 } from 'uuid';

/**
 * PUBLIC_INTERFACE
 * HabitService manages habits and their completion state.
 * Currently persisted via LocalStorage, but structured to later support HTTP if API base is provided.
 */
@Injectable({ providedIn: 'root' })
export class HabitService {
  private static HABITS_KEY = 'habits:data:v1';
  private static COMPLETIONS_KEY = 'habits:completions:v1';

  private habits$ = new BehaviorSubject<Habit[]>(
    StorageUtil.getJSON<Habit[]>(HabitService.HABITS_KEY, [])
  );
  private completions$ = new BehaviorSubject<HabitCompletion[]>(
    StorageUtil.getJSON<HabitCompletion[]>(HabitService.COMPLETIONS_KEY, [])
  );

  /**
   * PUBLIC_INTERFACE
   * observable of current habits list
   */
  getHabits$(): Observable<Habit[]> {
    return this.habits$.asObservable();
  }

  /**
   * PUBLIC_INTERFACE
   * observable of completions list
   */
  getCompletions$(): Observable<HabitCompletion[]> {
    return this.completions$.asObservable();
  }

  /**
   * PUBLIC_INTERFACE
   * Add a new habit
   */
  // PUBLIC_INTERFACE
  addHabit(input: { name: string; description?: string; dailyGoal?: number }): void {
    const dailyGoal = Math.max(1, input.dailyGoal ?? 1);
    const newHabit: Habit = {
      id: uuidv4(),
      name: input.name.trim(),
      description: input.description?.trim() || undefined,
      dailyGoal,
      createdAt: new Date().toISOString(),
    };
    const list = [...this.habits$.value, newHabit];
    this.habits$.next(list);
    StorageUtil.setJSON(HabitService.HABITS_KEY, list);
  }

  /**
   * PUBLIC_INTERFACE
   * Toggle today's completion for a habit. If under goal, increments; if at goal, resets to 0.
   */
  toggleToday(habitId: string, date: string = todayKey()): void {
    const comps = [...this.completions$.value];
    const idx = comps.findIndex(c => c.habitId === habitId && c.date === date);
    const habit = this.habits$.value.find(h => h.id === habitId);
    const goal = habit?.dailyGoal ?? 1;
    if (idx >= 0) {
      const current = comps[idx];
      const nextCount = current.count >= goal ? 0 : current.count + 1;
      comps[idx] = { ...current, count: nextCount };
    } else {
      comps.push({ habitId, date, count: 1 });
    }
    this.completions$.next(comps);
    StorageUtil.setJSON(HabitService.COMPLETIONS_KEY, comps);
  }

  /**
   * PUBLIC_INTERFACE
   * Compute derived stats: today's counts, streaks, and weekly counts per habit.
   */
  getHabitsWithStats$(): Observable<HabitWithStats[]> {
    return combineLatest([this.getHabits$(), this.getCompletions$()]).pipe(
      map(([habits, comps]) => {
        const today = todayKey();
        const week = lastNDates(7);
        return habits.map(h => {
          const todayCount = comps.find(c => c.habitId === h.id && c.date === today)?.count ?? 0;

          // streak: number of consecutive days (including today) with count >= dailyGoal
          let streak = 0;
          for (let i = 0; i < 365; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = todayKey(d);
            const c = comps.find(cc => cc.habitId === h.id && cc.date === key)?.count ?? 0;
            if (c >= h.dailyGoal) streak++;
            else break;
          }

          const weekly = week.map((d) => ({
            date: d,
            count: comps.find(c => c.habitId === h.id && c.date === d)?.count ?? 0
          }));

          return { ...h, todayCount, streak, weekly };
        });
      })
    );
  }

  /**
   * PUBLIC_INTERFACE
   * Compute overall dashboard summary for today and last 7 days.
   */
  getProgressSummary$(): Observable<{
    totalHabits: number;
    completedToday: number;
    today: string;
    week: { date: string; completed: number; goal: number }[];
  }> {
    return combineLatest([this.getHabits$(), this.getCompletions$()]).pipe(
      map(([habits, comps]) => {
        const today = todayKey();
        const week = lastNDates(7);
        const completedToday = habits.filter(h => {
          const count = comps.find(c => c.habitId === h.id && c.date === today)?.count ?? 0;
          return count >= h.dailyGoal;
        }).length;

        const weekData = week.map(d => {
          let completed = 0;
          let goal = 0;
          habits.forEach(h => {
            goal += h.dailyGoal > 0 ? 1 : 0;
            const cnt = comps.find(c => c.habitId === h.id && c.date === d)?.count ?? 0;
            if (cnt >= h.dailyGoal) completed += 1;
          });
          return { date: d, completed, goal };
        });

        return {
          totalHabits: habits.length,
          completedToday,
          today,
          week: weekData
        };
      })
    );
  }
}
