import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { WeatherService } from '../../../services/weather.service';
import { GeoLocationService } from '../../../../shared/services/geo-location.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IWeather } from '../../../interfaces/weather.interface';
import { IGeoLocation } from '../../../interfaces/geoLocation.interface';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-weather-list-week',
  standalone: true,
  imports: [AsyncPipe, DatePipe, LoadingComponent, NgForOf, NgIf],
  templateUrl: './weather-list-week.component.html',
  styleUrl: './weather-list-week.component.css',
})
export class WeatherListWeekComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly geoLocationService = inject(GeoLocationService);
  private readonly route = inject(ActivatedRoute);

  public weatherData$: Observable<IWeather[]>;

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues() {
    this.weatherData$ = this.route.parent!.params.pipe(
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