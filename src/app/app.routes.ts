import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

import { ProductList } from './features/products/product-list/product-list';


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

      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },

      {
        path: 'products',
        component: ProductList
      }

    ]
  }

];