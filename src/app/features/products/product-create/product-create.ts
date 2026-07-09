import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Warehouse as WarehouseService } from '../../../core/services/warehouse';
import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';

import { Product } from '../../../core/services/product';
import { ProductCreate as ProductCreateModel } from '../../../core/models/product-create';

import { ProductForm } from '../product-form/product-form';


@Component({
  selector: 'app-product-create',
  imports: [
    CommonModule,
    RouterLink,
    ProductForm
  ],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate implements OnInit {


  private warehouseService = inject(WarehouseService);

  private productService = inject(Product);

  private router = inject(Router);



  warehouses: WarehouseModel[] = [];



  ngOnInit(): void {

    this.loadWarehouses();

  }



  loadWarehouses(): void {


    this.warehouseService.getWarehouses()

      .subscribe({

        next: (warehouses) => {

          this.warehouses = warehouses;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }




  saveProduct(product: ProductCreateModel): void {


    this.productService.createProduct(product)

      .subscribe({

        next: (newProduct) => {


          // Mise à jour du Signal
          this.productService.products.update(products => [

            ...products,

            newProduct

          ]);


          this.router.navigate(['/products']);


        },


        error: (error: HttpErrorResponse) => {


          console.error(
            'Erreur création produit :',
            error
          );


        }

      });

  }


}