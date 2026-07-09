import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { API } from '../config/api.config';
import { Product as ProductModel } from '../models/product';
import { ProductCreate } from '../models/product-create';
import { ProductUpdate } from '../models/product-update';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {

  private http = inject(HttpClient);

  // ====== Etat (Signals) ======

  products = signal<ProductModel[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // ====== Chargement ======

  loadProducts(force = false): void {

    // Si les produits sont déjà chargés, on ne rappelle pas l'API
    if (!force && this.products().length > 0) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.http.get<ProductModel[]>(API.PRODUCTS).subscribe({

      next: (products) => {

        this.products.set(products);

        this.loading.set(false);

      },

      error: (err) => {

        console.error(err);

        this.error.set("Impossible de charger les produits.");

        this.loading.set(false);

      }

    });

  }

  updateProductWarehouse(
  productId: number,
  warehouseId: number
): void {

    this.products.update(products =>

      products.map(product =>

        product.id === productId

          ? {
              ...product,
              warehouse: warehouseId
            }

          : product

      )

    );

  }

  getProductById(id: number): ProductModel | undefined {

    return this.products().find(
      product => product.id === id
    );

}

  // ====== Détail ======

  getProduct(id: number) {

    return this.http.get<ProductModel>(
      `${API.PRODUCTS}${id}/`
    );

  }

  // ====== Création ======

  createProduct(product: ProductCreate) {

    return this.http.post<ProductModel>(
      API.PRODUCTS,
      product
    );

  }

  // ====== Modification ======

  updateProduct(id: number, product: ProductUpdate) {

    return this.http.put<ProductModel>(
      `${API.PRODUCTS}${id}/`,
      product
    );

  }

  // ====== Suppression ======

  deleteProduct(id: number) {

    return this.http.delete<void>(
      `${API.PRODUCTS}${id}/`
    );

  }

  moveProduct(
    id: number,
    warehouse: number
  ): Observable<any> {

    return this.http.post<any>(
      `${API.PRODUCTS}${id}/move/`,
      {
        warehouse
      }
    );

  }

}