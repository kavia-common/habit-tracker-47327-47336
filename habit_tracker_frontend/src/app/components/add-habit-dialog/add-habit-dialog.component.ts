import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-habit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="overlay" (click)="close()"></div>
  <div class="modal" role="dialog" aria-label="Add Habit">
    <h3>Add Habit</h3>
    <form (ngSubmit)="submit()" #f="ngForm">
      <label>
        Name
        <input type="text" name="name" [(ngModel)]="name" required placeholder="e.g. Drink water" />
      </label>
      <label>
        Description (optional)
        <textarea name="description" [(ngModel)]="description" rows="3" placeholder="Short note"></textarea>
      </label>
      <label>
        Daily goal
        <input type="number" name="dailyGoal" [(ngModel)]="dailyGoal" min="1" />
      </label>

      <div class="actions">
        <button type="button" class="btn btn-ghost" (click)="close()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="!name || !name.trim()">Add</button>
      </div>
    </form>
  </div>
  `,
  styles: [`
    .overlay {
      position: fixed; inset: 0; background: rgba(17,24,39,0.4);
    }
    .modal {
      position: fixed; left: 50%; top: 50%; transform: translate(-50%,-50%);
      width: 95%; max-width: 520px;
      background: #ffffff; color: #111827; border-radius: 14px;
      box-shadow: 0 10px 24px rgba(0,0,0,0.08);
      padding: 16px;
    }
    h3 { margin-bottom: 12px; }
    label { display: grid; gap: 6px; margin: 8px 0; font-size: 14px; }
    input, textarea {
      padding: 10px 12px; border: 1px solid rgba(17,24,39,0.12); border-radius: 10px;
      outline: none; transition: border .2s ease, box-shadow .2s ease; background: #f9fafb;
    }
    input:focus, textarea:focus {
      border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); background: #ffffff;
    }
    .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
    .btn { padding: 8px 12px; border-radius: 10px; border: 1px solid transparent; cursor: pointer; }
    .btn-primary { background: #2563EB; color: white; }
    .btn-primary:hover { background: #1e56cc; }
    .btn-ghost { background: transparent; color: #111827; border-color: rgba(17,24,39,0.12); }
    .btn-ghost:hover { background: #f3f4f6; }
  `]
})
export class AddHabitDialogComponent {
  @Output() canceled = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<{ name: string; description?: string; dailyGoal: number }>();

  name = '';
  description = '';
  dailyGoal = 1;

  close() {
    this.canceled.emit();
  }

  submit() {
    const payload = {
      name: this.name.trim(),
      description: this.description.trim() || undefined,
      dailyGoal: Math.max(1, Number(this.dailyGoal || 1))
    };
    this.submitted.emit(payload);
    this.reset();
  }

  private reset() {
    this.name = '';
    this.description = '';
    this.dailyGoal = 1;
  }
}
