import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Warehouse } from '../../../core/services/warehouse';
import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';
import { Product as ProductModel } from '../../../core/models/product';
import { Product } from '../../../core/services/product';


@Component({
  selector: 'app-warehouse-detail',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './warehouse-detail.html',
  styleUrl: './warehouse-detail.css',
})
export class WarehouseDetail implements OnInit {
  private route = inject(ActivatedRoute);

  private warehouseService = inject(Warehouse);
  warehouse?: WarehouseModel;

  private product = inject(Product);
  products: ProductModel[] = [];

  loading = true;

  error = '';

  loadProducts(warehouseId: number): void {

  this.products = this.product.products()
    .filter(product =>
      product.warehouse === warehouseId
    );

}

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    const existingWarehouse =
      this.warehouseService.getWarehouseById(id);

    if (existingWarehouse) {

      this.warehouse = existingWarehouse;

      this.loadProducts(id);

      this.loading = false;

      return;
    }
    this.warehouseService
      .getWarehouse(id)
      .subscribe({
        next: warehouse => {

          this.warehouseService
            .auditWarehouse(id)
            .subscribe({

              next: totalProducts => {

                warehouse.total_products = totalProducts;

                this.warehouse = warehouse;

                this.loading = false;

              },

              error: err => {

                console.error(err);

                this.warehouse = warehouse;

                this.loading = false;

              }

            });

        },
        error: err => {
          console.error(err);
          this.error =
            "Impossible de charger l'entrepôt.";
          this.loading = false;
        }
      });
  }

}