import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="nav">
      <div class="brand" [routerLink]="['/']">
        <span class="logo">⦿</span>
        <span class="title">{{title}}</span>
      </div>
      <nav class="links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Dashboard</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>
  `,
  styles: [`
    .nav {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: linear-gradient(180deg, rgba(37,99,235,0.08), rgba(249,250,251,1));
      border-bottom: 1px solid rgba(17,24,39,0.06);
      backdrop-filter: blur(6px);
      z-index: 10;
    }
    .brand { display: flex; align-items: center; gap: 8px; cursor: pointer; text-decoration: none; color: #111827; }
    .logo { color: #2563EB; font-size: 18px; }
    .title { font-weight: 600; }
    .links { display: flex; gap: 12px; }
    .links a { color: #111827; text-decoration: none; padding: 6px 10px; border-radius: 8px; transition: background .2s ease; }
    .links a:hover { background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
    .links a.active { color: #2563EB; background: #ffffff; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
  `]
})
export class HeaderComponent {
  @Input() title = 'Habit Tracker';
}
