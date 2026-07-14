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
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    quantity: [
      1,
      [
        Validators.required,
        Validators.min(1)
      ]
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
      [Validators.min(1)]
    ]

  });

  get name() {
  return this.productForm.controls.name;
  }

  get quantity() {
    return this.productForm.controls.quantity;
  }

  get expirationDate() {
    return this.productForm.controls.expiration_date;
  }

  get status() {
    return this.productForm.controls.status;
  }

  get warehouse() {
    return this.productForm.controls.warehouse;
  }

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
    this.productForm.get('expiration_date')?.valueChanges.subscribe(() => {
    this.updateStatusAccordingToDate();
  });

  }

  updateStatusAccordingToDate(): void {

    const expirationDate = this.productForm.get('expiration_date')?.value;

    if (!expirationDate) {
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiration = new Date(expirationDate);
    expiration.setHours(0, 0, 0, 0);

    const statusControl = this.productForm.get('status');

    if (!statusControl) {
      return;
    }

    if (expiration < today) {

      // Produit expiré
      statusControl.setValue('expired');
      statusControl.disable();

    } else {

      // Produit non expiré
      statusControl.enable();

      if (statusControl.value === 'expired') {
        statusControl.setValue('available');
      }

    }

}

  submit(): void {


    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }

    const product = this.productForm.getRawValue();

    const today = new Date();
    today.setHours(0,0,0,0);

    const expiration = new Date(product.expiration_date);
    expiration.setHours(0,0,0,0);

    if (expiration >= today && product.status === 'expired') {
      alert("Un produit non expiré ne peut pas avoir le statut 'Périmé'.");
      return;
    }

    this.save.emit(
      this.productForm.getRawValue()
    );

  }

}