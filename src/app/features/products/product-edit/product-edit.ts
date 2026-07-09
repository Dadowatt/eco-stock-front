import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Product as ProductService } from '../../../core/services/product';
import { Product as ProductModel } from '../../../core/models/product';

import { Warehouse as WarehouseService } from '../../../core/services/warehouse';
import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';

import { ProductUpdate } from '../../../core/models/product-update';

import { ProductForm } from '../product-form/product-form';


@Component({
  selector: 'app-product-edit',
  imports: [
    CommonModule,
    RouterLink,
    ProductForm
  ],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit implements OnInit {


  private route = inject(ActivatedRoute);

  private router = inject(Router);


  private productService = inject(ProductService);

  private warehouseService = inject(WarehouseService);



  product?: ProductModel;


  warehouses: WarehouseModel[] = [];



  ngOnInit(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    this.loadWarehouses();


    this.loadProduct(id);


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



  loadProduct(id: number): void {


    // Cherche d'abord dans le Signal

    const existingProduct =
      this.productService.getProductById(id);



    if (existingProduct) {

      this.product = existingProduct;

      return;

    }



    // Sinon API

    this.productService.getProduct(id)

      .subscribe({

        next: (product) => {

          this.product = product;

        },


        error: (error: HttpErrorResponse) => {

          console.error(error);

        }

      });

  }




  updateProduct(product: ProductUpdate): void {


    if (!this.product) {

      return;

    }



    this.productService.updateProduct(

      this.product.id,

      product

    )

    .subscribe({

      next: (updatedProduct) => {


        // Mise à jour du Signal

        this.productService.products.update(products =>


          products.map(product =>

            product.id === updatedProduct.id

              ? updatedProduct

              : product

          )


        );



        this.router.navigate(['/products']);


      },


      error: (error: HttpErrorResponse) => {

        console.error(
          'Erreur modification produit :',
          error
        );

      }


    });


  }


}