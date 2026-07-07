import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet],
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
