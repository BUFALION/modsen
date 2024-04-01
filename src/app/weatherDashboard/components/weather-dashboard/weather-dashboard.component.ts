import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { WeatherTogglerComponent } from '../weather-toggler/weather-toggler.component';
import { GeoLocationService } from '../../../shared/services/geo-location.service';
import { Subscription } from 'rxjs';

import { IGeoLocation } from '../../interfaces/geoLocation.interface';
import { WeatherSearchComponent } from '../weather-search/weather-search.component';
import {EventCalenderComponent} from "../event-calender/event-calender.component";

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    WeatherTogglerComponent,
    RouterOutlet,
    WeatherSearchComponent,
    DatePipe,
    EventCalenderComponent,
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];

  public city: string;

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.city = params['city'] || this.getCurrentLocation();
      })
    );
  }

  private getCurrentLocation() {
    this.subscriptions.push(
      this.geoLocationService
        .getCurrentPosition()
        .subscribe((geoLocation: IGeoLocation) => {
          this.city = geoLocation.name;
          this.router.navigate([`${this.city}/week`]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
