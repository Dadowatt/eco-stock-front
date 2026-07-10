import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Warehouse } from '../../../core/services/warehouse';

@Component({
  selector: 'app-warehouse-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './warehouse-list.html',
  styleUrl: './warehouse-list.css'
})
export class WarehouseList implements OnInit {

  warehouseService = inject(Warehouse);

  // Signals du service
  warehouses = this.warehouseService.warehouses;
  loading = this.warehouseService.loading;
  error = this.warehouseService.error;

  ngOnInit(): void {

    this.warehouseService.loadWarehouses();

  }

  deleteWarehouse(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer cet entrepôt ?'
    );

    if (!confirmation) {
      return;
    }

    this.warehouseService
      .deleteWarehouse(id)
      .subscribe({

        next: () => {

          // Mise à jour du Signal
          this.warehouseService.warehouses.update(
            warehouses =>
              warehouses.filter(
                warehouse => warehouse.id !== id
              )
          );

        },

        error: (error) => {

          console.error(
            'Erreur suppression entrepôt :',
            error
          );

        }

      });

  }

}