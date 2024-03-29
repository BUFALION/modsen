import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { map, Observable } from 'rxjs';
import { IWeather } from '../../../interfaces/weather.interface';
import { IGeoLocation } from '../../../interfaces/geoLocation.interface';
import { BaseWeatherListComponent } from '../base-weather-list-component/base-weather-list.component';

@Component({
  selector: 'app-weather-list-hourly',
  standalone: true,
  imports: [AsyncPipe, DatePipe, LoadingComponent, NgForOf, NgIf],
  templateUrl: './weather-list-hourly.component.html',
  styleUrls: [
    './weather-list-hourly.component.css',
    '../base-weather-list-component/base-weather-list.component.css',
  ],
})
export class WeatherListHourlyComponent extends BaseWeatherListComponent {
  protected fetchWeatherData(
    geoLocation: IGeoLocation
  ): Observable<IWeather[]> {
    return this.weatherService
      .getWeatherHourly(geoLocation.lat, geoLocation.lon)
      .pipe(
        map((weatherData: IWeather[]) => {
          return weatherData.filter((_, index) => index % 3 === 0);
        })
      );
  }
}
