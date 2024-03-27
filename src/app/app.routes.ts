import { Routes } from '@angular/router';
import {WeatherDashboardComponent} from "./weatherDashboard/components/weather-dashboard/weather-dashboard.component";

export const routes: Routes = [
  {
    path: ':city',
    component: WeatherDashboardComponent

  },
  {
    path: '',
    component: WeatherDashboardComponent

  },
];
