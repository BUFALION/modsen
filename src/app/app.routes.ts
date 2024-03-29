import { Routes } from '@angular/router';
import {WeatherDashboardComponent} from "./weatherDashboard/components/weather-dashboard/weather-dashboard.component";
import {
  WeatherListWeekComponent
} from "./weatherDashboard/components/weather-list/weather-list-week/weather-list-week.component";
import {
  WeatherListHourlyComponent
} from "./weatherDashboard/components/weather-list/weather-list-hourly/weather-list-hourly.component";

export const routes: Routes = [
  {
    path: ':city',
    component: WeatherDashboardComponent,
    children: [

      {
        path: 'week',
        component: WeatherListWeekComponent
      },
      {
        path: 'hourly',
        component: WeatherListHourlyComponent
      },
      {
        path: '**',
        pathMatch: "full",
        redirectTo: 'week'
      },

    ]
  },
  {
    path: '',
    component: WeatherDashboardComponent,
  }
];
