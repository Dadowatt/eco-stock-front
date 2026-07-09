import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  inject,
  signal
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { Product as ProductModel } from '../../../core/models/product';
import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';

import { Product as ProductService } from '../../../core/services/product';
import { Warehouse as WarehouseService } from '../../../core/services/warehouse';



@Component({
  selector: 'app-product-move',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-move.html',
  styleUrl: './product-move.css'
})
export class ProductMove implements OnInit {

  @Input()
  product?: ProductModel;

  @Output()
  close = new EventEmitter<void>();

  private productService = inject(ProductService);

  private warehouseService = inject(WarehouseService);

  warehouses = signal<WarehouseModel[]>([]);

  selectedWarehouse = signal<number | undefined>(
    undefined
  );

  loading = signal(false);
  warehousesLoading = signal(true);
  errorMessage = signal('');
  ngOnInit(): void {

    this.loadWarehouses();

  }
  loadWarehouses(): void {
    this.warehousesLoading.set(true);
    this.warehouseService.getWarehouses()

      .subscribe({

        next: (warehouses) => {
          console.log(
            'Warehouses reçus :',
            warehouses
          );
          this.warehouses.set(
            warehouses
          );
          this.warehousesLoading.set(
            false
          );
        },
        error: (error) => {
          console.error(
            'Erreur chargement warehouses :',
            error
          );

          this.errorMessage.set(
            'Impossible de charger les entrepôts.'
          );
          this.warehousesLoading.set(
            false
          );
        }
      });
  }

  moveProduct(): void {
    if (
      !this.product ||
      !this.selectedWarehouse()
    ) {

      return;
    }

    this.loading.set(true);
    this.productService.moveProduct(

      this.product.id,

      this.selectedWarehouse()!

    )
      .subscribe({
        next: () => {

          this.productService.updateProductWarehouse(

            this.product!.id,

            this.selectedWarehouse()!

          );

          this.close.emit();

        },

        error: (error: HttpErrorResponse) => {
          console.error(
            'Erreur déplacement produit :',
            error
          );

          this.errorMessage.set(

            error.error?.error ??
            'Erreur lors du déplacement du produit.'

          );

          this.loading.set(false);
        }
      });
  }

  canMove(): boolean {
    return this.product?.status !== 'expired';
  }

}