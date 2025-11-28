import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitWithStats } from '../../models/habit.model';

@Component({
  selector: 'app-habit-card',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="card">
    <div class="row">
      <div class="meta">
        <div class="name">{{habit.name}}</div>
        <div class="desc" *ngIf="habit.description">{{habit.description}}</div>
      </div>
      <button class="toggle" (click)="toggle.emit(habit.id)" [attr.aria-label]="'Toggle ' + habit.name">
        <span class="dot" [class.done]="habit.todayCount >= habit.dailyGoal"></span>
        <span class="toggle-text">
          {{ habit.todayCount }}/{{ habit.dailyGoal }} today
        </span>
      </button>
    </div>
    <div class="stats">
      <span class="chip chip-streak">🔥 Streak: {{habit.streak}}</span>
    </div>
  </div>
  `,
  styles: [`
    .card {
      background: #ffffff; color: #111827; border-radius: 14px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.04);
      padding: 12px; display: grid; gap: 8px; border: 1px solid rgba(17,24,39,0.06);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .card:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
    .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .meta { display: grid; gap: 4px; }
    .name { font-weight: 600; }
    .desc { font-size: 13px; color: #4b5563; }
    .toggle {
      display: flex; align-items: center; gap: 8px;
      background: #2563EB; color: white; border: none; border-radius: 9999px; padding: 8px 12px;
      cursor: pointer; box-shadow: 0 2px 6px rgba(37,99,235,0.3); transition: background .2s ease, transform .05s ease;
    }
    .toggle:hover { background: #1e56cc; }
    .toggle:active { transform: translateY(1px); }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #EF4444; display: inline-block; }
    .dot.done { background: #F59E0B; }
    .toggle-text { font-weight: 600; }
    .stats { display: flex; gap: 8px; flex-wrap: wrap; }
    .chip { font-size: 12px; padding: 4px 8px; border-radius: 999px; }
    .chip-streak { background: #f3f4f6; color: #111827; }
  `]
})
export class HabitCardComponent {
  @Input() habit!: HabitWithStats;
  @Output() toggle = new EventEmitter<string>();
}
