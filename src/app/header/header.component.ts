import {  Component,inject,PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-10px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden <=> visible', animate('600ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent {
  userRole: 'ADMIN' | 'USER' | null = null;
  isLoggedIn = false;
  isAtRoot = false;
  showSlogan = false;

  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isLoggedIn = true;
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.userRole = payload.role;
      }
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      location.reload();
    }
  }

  toggleSlogan(): void {
    this.showSlogan = !this.showSlogan;
  }
}
