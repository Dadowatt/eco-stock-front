import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Warehouse } from '../../../core/services/warehouse';
import { Warehouse as WarehouseModel } from '../../../core/models/warehouse';


@Component({
  selector: 'app-warehouse-detail',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './warehouse-detail.html',
  styleUrl: './warehouse-detail.css',
})
export class WarehouseDetail implements OnInit {


  private route = inject(ActivatedRoute);

  private warehouseService = inject(Warehouse);



  warehouse?: WarehouseModel;

  loading = true;

  error = '';



  ngOnInit(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );


    // Recherche dans le Signal

    const existingWarehouse =
      this.warehouseService.getWarehouseById(id);



    if (existingWarehouse) {


      this.warehouse = existingWarehouse;

      this.loading = false;


      return;

    }



    // Sinon appel API

    this.warehouseService
      .getWarehouse(id)
      .subscribe({


        next: warehouse => {


          this.warehouse = warehouse;

          this.loading = false;


        },


        error: err => {


          console.error(err);


          this.error =
            "Impossible de charger l'entrepôt.";


          this.loading = false;


        }


      });



  }


}