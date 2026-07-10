import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Product as ProductService } from '../../../core/services/product';
import { Product as ProductModel } from '../../../core/models/product';


@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {


  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);


  product?: ProductModel;


  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const existingProduct =
      this.productService.getProductById(id);


    if (existingProduct) {

      this.product = existingProduct;

      return;

    }

    this.loadProduct(id);

  }

  loadProduct(id: number): void {


    this.productService.getProduct(id)

      .subscribe({

        next: (product) => {

          this.product = product;

          this.productService.products.update(products => {

            const exists =
              products.some(p => p.id === product.id);


            if (exists) {

              return products.map(p =>
                p.id === product.id
                  ? product
                  : p
              );

            }


            return [
              ...products,
              product
            ];

          });

        },


        error: (error: HttpErrorResponse) => {

          console.error(
            'Erreur chargement produit :',
            error
          );

        }

      });

  }

}