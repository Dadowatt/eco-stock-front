import { 
  Component, 
  EventEmitter, 
  Input, 
  Output,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';
import { Product as ProductModel } from '../../../core/models/product';
import { ProductCreate } from '../../../core/models/product-create';


@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {


  private fb = inject(NonNullableFormBuilder);


  @Input()
  warehouses: WarehouseModel[] = [];


  @Input()
  product?: ProductModel;


  @Output()
  save = new EventEmitter<ProductCreate>();


  productForm = this.fb.group({

    name: [
      '',
      Validators.required
    ],

    quantity: [
      1,
      Validators.required
    ],

    expiration_date: [
      '',
      Validators.required
    ],

    status: [
      'available',
      Validators.required
    ],

    warehouse: [
      0,
      Validators.required
    ]

  });



  ngOnInit(): void {


    if (this.product) {

      this.productForm.patchValue({

        name: this.product.name,

        quantity: this.product.quantity,

        expiration_date: this.product.expiration_date,

        status: this.product.status,

        warehouse: this.product.warehouse

      });

    }

  }



  submit(): void {


    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }


    this.save.emit(
      this.productForm.getRawValue()
    );

  }

}