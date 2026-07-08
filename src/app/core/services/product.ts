import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from '../config/api.config';
import { Product as ProductModel } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class Product {

  private http = inject(HttpClient);


  getProducts(): Observable<ProductModel[]> {

    return this.http.get<ProductModel[]>(API.PRODUCTS);

  }

}