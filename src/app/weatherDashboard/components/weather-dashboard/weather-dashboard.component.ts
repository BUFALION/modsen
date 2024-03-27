import { Component, inject, OnInit } from '@angular/core';
import { WeatherListComponent } from '../weather-list/weather-list.component';
import { WeatherService } from '../../services/weather.service';
import { IWeather } from '../../interfaces/weather.interface';
import { Observable, switchMap } from 'rxjs';
import { GeoLocationService } from '../../../shared/services/geo-location.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IGeoLocation } from '../../interfaces/geoLocation.interface';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [WeatherListComponent, AsyncPipe, LoadingComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly route = inject(ActivatedRoute);

  public weatherData$: Observable<IWeather[]>;

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues() {
    this.weatherData$ = this.route.params.pipe(
      switchMap(params => {
        const city = params['city'];

        return this.geoLocationService.getGeocoding(city);
      }),
      switchMap((geoLocation: IGeoLocation) => {
        return this.weatherService.getWeather(geoLocation.lat, geoLocation.lon);
      })
    );
  }
}
