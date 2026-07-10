import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Warehouse } from '../../../core/services/warehouse';
import { WarehouseCreate as WarehouseCreateModel } from '../../../core/models/warehouse-create';


@Component({
  selector: 'app-warehouse-create',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './warehouse-create.html',
  styleUrl: './warehouse-create.css',
})
export class WarehouseCreate {


  private warehouseService = inject(Warehouse);

  private router = inject(Router);



  warehouse: WarehouseCreateModel = {

      name:'',

      location:'',

      capacity:0

  };



  loading = false;



  error = '';



  createWarehouse(): void {


    this.loading = true;

    this.error = '';



    this.warehouseService
      .createWarehouse(this.warehouse)
      .subscribe({


        next: (warehouse) => {



          // Mise à jour du Signal

          this.warehouseService.warehouses.update(

            warehouses => [

              ...warehouses,

              warehouse

            ]

          );



          this.router.navigate(['/warehouses']);



        },


        error: (err) => {


          console.error(err);


          this.error =
            "Impossible de créer l'entrepôt.";


          this.loading = false;


        },


        complete: () => {

          this.loading = false;

        }


      });



  }



  cancel(): void {

    this.router.navigate(['/warehouses']);

  }


}