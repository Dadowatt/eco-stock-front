import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Product } from '../../../core/services/product';
import { Product as ProductModel } from '../../../core/models/product';
import { ProductMove } from '../product-move/product-move';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    RouterLink,
    ProductMove
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  productService = inject(Product);

  // Les Signals du service
  products = this.productService.products;
  loading = this.productService.loading;
  error = this.productService.error;
  selectedProduct?: ProductModel;

  ngOnInit(): void {

    this.productService.loadProducts();

  }

  deleteProduct(id: number): void {

    const confirmation = confirm(
      'Voulez-vous vraiment supprimer ce produit ?'
    );

    if (!confirmation) {
      return;
    }

    this.productService.deleteProduct(id)
      .subscribe({

        next: () => {

          // Mise à jour automatique du Signal
          this.productService.products.update(products =>
            products.filter(product => product.id !== id)
          );

        },

        error: (error) => {

          console.error(
            'Erreur suppression produit :',
            error
          );

        }

      });

  }
  openMove(product: ProductModel): void {

    this.selectedProduct = product;

  }

  closeMove(): void {

    this.selectedProduct = undefined;

  }

}