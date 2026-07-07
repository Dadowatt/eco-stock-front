import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
      canActivate: [
    guestGuard
  ]
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [
      authGuard
    ],
    children: [

    ]
  }
];
