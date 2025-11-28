export interface Habit {
  id: string;             // uuid
  name: string;
  description?: string;
  dailyGoal: number;      // defaults to 1
  createdAt: string;      // ISO date
}

export interface HabitCompletion {
  habitId: string;
  date: string;           // yyyy-mm-dd
  count: number;          // number of times completed today
}

export interface HabitWithStats extends Habit {
  todayCount: number;
  streak: number;
  weekly: { date: string; count: number }[];
}
