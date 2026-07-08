import { Component, inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Product as ProductModel } from '../../../core/models/product';
import { Product } from '../../../core/services/product';


@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private productService = inject(Product);


  products: ProductModel[] = [];


  ngOnInit(): void {

    this.loadProducts();

  }


  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (products: ProductModel[]) => {

        this.products = products;

      },


      error: (error: HttpErrorResponse) => {

        console.error(error);

      }

    });

  }

}