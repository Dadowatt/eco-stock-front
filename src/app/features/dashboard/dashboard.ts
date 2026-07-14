import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  imports: [BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dashboard = inject(DashboardService)

  ngOnInit(): void {
    this.dashboard.loadDashboard()
  }

}
