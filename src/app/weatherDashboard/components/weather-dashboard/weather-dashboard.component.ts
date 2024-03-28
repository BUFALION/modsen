import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {ActivatedRoute, Params, Router, RouterOutlet} from '@angular/router';
import {LoadingComponent} from '../../../shared/components/loading/loading.component';
import {WeatherTogglerComponent} from '../weather-toggler/weather-toggler.component';
import {GeoLocationService} from '../../../shared/services/geo-location.service';
import { Subscription} from 'rxjs';

import {IGeoLocation} from '../../interfaces/geoLocation.interface';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    WeatherTogglerComponent,
    RouterOutlet,
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        if (!params['city']) this.getCurrentLocation();
      })
    );
  }
  private getCurrentLocation() {
    this.subscriptions.push(
      this.geoLocationService.getCurrentPosition().subscribe(
        (geoLocation: IGeoLocation) => {
          this.router.navigate([`${geoLocation.name}/week`]);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }

}

