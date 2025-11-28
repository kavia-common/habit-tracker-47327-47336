import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header title="Habit Tracker"></app-header>
    <main class="wrap">
      <section class="panel">
        <h2>About</h2>
        <p>This lightweight habit tracker helps you create daily habits, mark completions, and view progress without requiring a backend.</p>
        <ul>
          <li>Add habits with a name, optional description, and daily goal.</li>
          <li>Toggle today's progress directly from the dashboard.</li>
          <li>See weekly trend and streaks for motivation.</li>
        </ul>
        <p>Data is stored locally in your browser and will persist across reloads.</p>
      </section>
    </main>
  `,
  styles: [`
    .wrap { min-height: 100vh; background: #f9fafb; padding: 16px; }
    .panel { background: #ffffff; padding: 16px; border-radius: 14px; border: 1px solid rgba(17,24,39,0.06); box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
    h2 { margin-bottom: 8px; }
    ul { margin: 8px 0 0 16px; }
    li { margin: 4px 0; }
  `]
})
export class AboutComponent {}
