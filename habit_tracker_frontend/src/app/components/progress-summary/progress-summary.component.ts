import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="summary">
      <div class="card kpi">
        <div class="kpi-title">Habits Completed Today</div>
        <div class="kpi-value">{{completedToday}} / {{totalHabits}}</div>
        <div class="kpi-date">{{today}}</div>
      </div>
      <div class="card week">
        <div class="kpi-title">Weekly Trend</div>
        <div class="week-grid">
          <div class="day" *ngFor="let d of week">
            <div class="bar">
              <div class="fill" [style.height.%]="barPercent(d)"></div>
            </div>
            <div class="xlabel">{{ d.date.slice(5) }}</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .summary { display: grid; gap: 12px; grid-template-columns: 1fr; }
    @media (min-width: 760px) { .summary { grid-template-columns: 1fr 2fr; } }
    .card { background: #ffffff; color: #111827; border-radius: 14px; border: 1px solid rgba(17,24,39,0.06);
            padding: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
    .kpi { display: grid; gap: 6px; }
    .kpi-title { color: #4b5563; font-size: 14px; }
    .kpi-value { font-size: 28px; font-weight: 700; color: #2563EB; }
    .kpi-date { font-size: 12px; color: #6b7280; }
    .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; align-items: end; margin-top: 12px; }
    .bar { height: 80px; background: #f3f4f6; border-radius: 10px; overflow: hidden; border: 1px solid rgba(17,24,39,0.06); }
    .fill { background: linear-gradient(180deg, #2563EB, #1e56cc); width: 100%; height: 0; transition: height .3s ease; }
    .xlabel { font-size: 11px; text-align: center; color: #6b7280; margin-top: 4px; }
  `]
})
export class ProgressSummaryComponent {
  @Input() totalHabits = 0;
  @Input() completedToday = 0;
  @Input() today = '';
  @Input() week: { date: string; completed: number; goal: number }[] = [];

  barPercent(d: { completed: number; goal: number }): number {
    if (!d.goal) return 0;
    return Math.round((d.completed / d.goal) * 100);
  }
}
