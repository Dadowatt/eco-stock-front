import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from '../config/api.config';
import { Warehouse as WarehouseModel } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class Warehouse {

  private http = inject(HttpClient);

  getWarehouses(): Observable<WarehouseModel[]> {

    return this.http.get<WarehouseModel[]>(
      API.WAREHOUSES
    );

  }

  getWarehouse(id: number): Observable<WarehouseModel> {

    return this.http.get<WarehouseModel>(
      `${API.WAREHOUSES}${id}/`
    );

  }

  createWarehouse(warehouse: WarehouseModel): Observable<WarehouseModel> {

    return this.http.post<WarehouseModel>(
      API.WAREHOUSES,
      warehouse
    );

  }

  updateWarehouse(
    id: number,
    warehouse: WarehouseModel
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