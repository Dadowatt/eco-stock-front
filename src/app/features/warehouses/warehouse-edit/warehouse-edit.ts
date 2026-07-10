import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Warehouse as WarehouseService } from '../../../core/services/warehouse';

import { Warehouse as WarehouseModel }
from '../../../core/models/warehouse';

import { WarehouseUpdate as WarehouseUpdateModel }
from '../../../core/models/warehouse-update';


@Component({
  selector: 'app-warehouse-edit',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './warehouse-edit.html',
  styleUrl: './warehouse-edit.css',
})
export class WarehouseEdit implements OnInit {
  private warehouseService = inject(WarehouseService);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  // Warehouse complet récupéré depuis l'API
  warehouse!: WarehouseModel;

  // Données envoyées au PUT
  form!: WarehouseUpdateModel;

  loading = false;
  error = '';

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    const existingWarehouse =
      this.warehouseService.getWarehouseById(id);
    if (existingWarehouse) {
      this.setWarehouse(existingWarehouse);
    } else {
      this.warehouseService
        .getWarehouse(id)
        .subscribe({
          next: warehouse => {
            this.setWarehouse(warehouse);
          },

          error: err => {
            console.error(err);
            this.error =
            "Impossible de charger l'entrepôt.";
          }
        });
    }
  }





  private setWarehouse(
    warehouse: WarehouseModel
  ): void {


    this.warehouse = warehouse;


    this.form = {


      name: warehouse.name,


      location: warehouse.location,


      capacity: warehouse.capacity


    };


  }





  updateWarehouse(): void {


    this.loading = true;

    this.error = '';



    this.warehouseService
      .updateWarehouse(

        this.warehouse.id,

        this.form

      )
      .subscribe({



        next: updatedWarehouse => {



          this.warehouseService.warehouses.update(

            warehouses =>

              warehouses.map(warehouse =>


                warehouse.id === updatedWarehouse.id

                ? updatedWarehouse

                : warehouse


              )

          );



          this.router.navigate([
            '/warehouses'
          ]);



        },



        error: err => {



          console.error(err);



          this.error =
          "Impossible de modifier l'entrepôt.";



          this.loading = false;



        },



        complete: () => {


          this.loading = false;


        }



      });



  }





  cancel(): void {


    this.router.navigate([
      '/warehouses'
    ]);


  }


}