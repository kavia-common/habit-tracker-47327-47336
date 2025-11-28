import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';
import { HabitListComponent } from '../../components/habit-list/habit-list.component';
import { ProgressSummaryComponent } from '../../components/progress-summary/progress-summary.component';
import { AddHabitDialogComponent } from '../../components/add-habit-dialog/add-habit-dialog.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { HabitWithStats } from '../../models/habit.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, HabitListComponent, ProgressSummaryComponent, AddHabitDialogComponent],
  template: `
    <app-header title="Habit Tracker"></app-header>
    <main class="wrap">
      <section class="toolbar">
        <h2>Dashboard</h2>
        <button class="btn btn-primary" (click)="openAdd()">+ Add Habit</button>
      </section>

      <app-progress-summary
        [totalHabits]="(summary$ | async)?.totalHabits || 0"
        [completedToday]="(summary$ | async)?.completedToday || 0"
        [today]="(summary$ | async)?.today || ''"
        [week]="(summary$ | async)?.week || []"
      ></app-progress-summary>

      <section class="list-wrap">
        <app-habit-list
          [habits]="(habits$ | async) || []"
          (toggle)="toggleHabit($event)"
        ></app-habit-list>
      </section>
    </main>

    <app-add-habit-dialog
      *ngIf="showAdd()"
      (canceled)="closeAdd()"
      (submitted)="createHabit($event)"
    ></app-add-habit-dialog>
  `,
  styles: [`
    .wrap {
      min-height: 100vh;
      background: #f9fafb;
      padding: 16px;
      display: grid; gap: 16px;
    }
    .toolbar {
      display: flex; align-items: center; justify-content: space-between;
      background: #ffffff; padding: 12px; border-radius: 14px;
      border: 1px solid rgba(17,24,39,0.06);
      box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    }
    h2 { font-size: 18px; }
    .btn { padding: 8px 12px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; }
    .btn-primary { background: #2563EB; color: white; }
    .btn-primary:hover { background: #1e56cc; }
    .list-wrap { display: grid; gap: 12px; }
  `]
})
export class DashboardComponent {
  habits$!: Observable<HabitWithStats[]>;
  summary$!: Observable<{ totalHabits: number; completedToday: number; today: string; week: { date: string; completed: number; goal: number }[] }>;

  private showAddSignal = signal(false);
  // PUBLIC_INTERFACE
  showAdd = computed(() => this.showAddSignal());

  constructor(private habitService: HabitService) {
    // Initialize after DI is ready
    this.habits$ = this.habitService.getHabitsWithStats$();
    this.summary$ = this.habitService.getProgressSummary$();
  }

  // PUBLIC_INTERFACE
  openAdd() { this.showAddSignal.set(true); }
  // PUBLIC_INTERFACE
  closeAdd() { this.showAddSignal.set(false); }

  // PUBLIC_INTERFACE
  createHabit(dto: { name: string; description?: string; dailyGoal: number }) {
    this.habitService.addHabit(dto);
    this.closeAdd();
  }

  // PUBLIC_INTERFACE
  toggleHabit(habitId: string) {
    this.habitService.toggleToday(habitId);
  }
}
