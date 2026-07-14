import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { Auth } from '../../core/services/auth';


@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  private auth = inject(Auth);

  private router = inject(Router);

  logout(){

    this.auth.logout();

    this.router.navigate(['/login']);
  }
}