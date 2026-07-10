import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { MainLayout } from './layout/main-layout/main-layout';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

import { ProductList } from './features/products/product-list/product-list';
import { ProductCreate } from './features/products/product-create/product-create';
import { ProductDetail } from './features/products/product-detail/product-detail';
import { ProductEdit } from './features/products/product-edit/product-edit';
import { WarehouseList } from './features/warehouses/warehouse-list/warehouse-list';
import { WarehouseCreate } from './features/warehouses/warehouse-create/warehouse-create';
import { WarehouseDetail } from './features/warehouses/warehouse-detail/warehouse-detail';
import { WarehouseEdit } from './features/warehouses/warehouse-edit/warehouse-edit';


export const routes: Routes = [

  {
    path: 'login',
    component: Login,
    canActivate: [guestGuard]
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    component: ProductList
  },

  {
    path: 'products/new',
    component: ProductCreate
  },

  {
    path: 'products/:id/edit',
    component: ProductEdit
  },

  {
    path: 'products/:id',
    component: ProductDetail
  },
  {
    path: 'warehouses',
    component: WarehouseList
  },
  {
  path: 'warehouses/new',
    component: WarehouseCreate
  },
  {
  path: 'warehouses/:id/edit',
    component: WarehouseEdit
  },
  {
  path: 'warehouses/:id',
    component: WarehouseDetail
  }

]

  }

];