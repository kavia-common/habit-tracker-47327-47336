import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitWithStats } from '../../models/habit.model';
import { HabitCardComponent } from '../habit-card/habit-card.component';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, HabitCardComponent],
  template: `
    <div class="list" *ngIf="habits?.length; else empty">
      <app-habit-card *ngFor="let h of habits" [habit]="h" (toggle)="toggle.emit($event)"></app-habit-card>
    </div>
    <ng-template #empty>
      <div class="empty">
        <div class="bubble">No habits yet</div>
        <p>Add your first habit to start tracking.</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .list { display: grid; gap: 12px; }
    .empty { text-align: center; color: #4b5563; padding: 24px; }
    .bubble { display: inline-block; background: #e5e7eb; color: #111827; padding: 6px 10px; border-radius: 9999px; margin-bottom: 6px; }
  `]
})
export class HabitListComponent {
  @Input() habits: HabitWithStats[] = [];
  @Output() toggle = new EventEmitter<string>();
}
