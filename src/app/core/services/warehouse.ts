import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from '../config/api.config';
import { Warehouse as WarehouseModel } from '../models/warehouse';

import { WarehouseCreate } from '../models/warehouse-create';
import { WarehouseUpdate } from '../models/warehouse-update';

@Injectable({
  providedIn: 'root'
})
export class Warehouse {

  private http = inject(HttpClient);

  // ===== Etat =====

  warehouses = signal<WarehouseModel[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  getWarehouses(): Observable<WarehouseModel[]> {

  return this.http.get<WarehouseModel[]>(
    API.WAREHOUSES
    );

  }

  // ===== Chargement =====

  loadWarehouses(force = false): void {

    if (!force && this.warehouses().length > 0) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http.get<WarehouseModel[]>(API.WAREHOUSES)
      .subscribe({

        next: warehouses => {

          this.warehouses.set(warehouses);
          this.loading.set(false);

        },

        error: err => {

          console.error(err);

          this.error.set(
            'Impossible de charger les entrepôts.'
          );

          this.loading.set(false);

        }

      });

  }

  // ===== Recherche locale =====

  getWarehouseById(id: number): WarehouseModel | undefined {

    return this.warehouses().find(
      warehouse => warehouse.id === id
    );

  }

  // ===== API =====

  getWarehouse(id: number): Observable<WarehouseModel> {

    return this.http.get<WarehouseModel>(
      `${API.WAREHOUSES}${id}/`
    );

  }

  createWarehouse(
    warehouse: WarehouseCreate
  ): Observable<WarehouseModel> {

      return this.http.post<WarehouseModel>(
          API.WAREHOUSES,
          warehouse
      );

  }

  updateWarehouse(
    id: number,
    warehouse: WarehouseUpdate
  ): Observable<WarehouseModel> {

    return this.http.put<WarehouseModel>(
      `${API.WAREHOUSES}${id}/`,
      warehouse
    );

  }

  deleteWarehouse(id: number): Observable<void> {

    return this.http.delete<void>(
      `${API.WAREHOUSES}${id}/`
    );

  }

}