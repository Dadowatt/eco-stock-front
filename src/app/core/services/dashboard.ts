import { computed, inject, Injectable } from '@angular/core';
import { Product } from './product';
import { Warehouse } from './warehouse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private product = inject(Product);

    private warehouse = inject(Warehouse);

    stats = computed(() => {

    const products = this.product.products();
    const warehouses = this.warehouse.warehouses();

    return {

        totalProducts: products.length,

        totalWarehouses: warehouses.length,

        availableProducts: products.filter(
        product => product.status === 'available'
        ).length,

        reservedProducts: products.filter(
        product => product.status === 'reserved'
        ).length,

        expiredProducts: products.filter(
        product => product.status === 'expired'
        ).length

    };

    });

    chartData = computed(() => {

  const stats = this.stats();

  return {

    labels: [
      'Disponibles',
      'Réservés',
      'Périmés'
    ],

    datasets: [
      {
        data: [
          stats.availableProducts,
          stats.reservedProducts,
          stats.expiredProducts
        ],

        backgroundColor: [
          '#198754',
          '#ffc107',
          '#dc3545'
        ]
      }
    ]

  };

});

    loadDashboard(): void {

        this.product.loadProducts();

        this.warehouse.loadWarehouses();
    }

    loading = computed(() => this.product.loading() || this.warehouse.loading());

    error = computed(() =>
    this.product.error() ??
    this.warehouse.error()
    );

    warehouses = computed(() =>
    this.warehouse.warehouses()
);
}
