import { Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';

import { Observable } from 'rxjs';
import { IWeather } from '../../../interfaces/weather.interface';
import { IGeoLocation } from '../../../interfaces/geoLocation.interface';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import {BaseWeatherListComponent} from "../base-weather-list-component/base-weather-list.component";

@Component({
  selector: 'app-weather-list-week',
  standalone: true,
  imports: [AsyncPipe, DatePipe, LoadingComponent, NgForOf, NgIf],
  templateUrl: './weather-list-week.component.html',
  styleUrls: ['./weather-list-week.component.css',
    '../base-weather-list-component/base-weather-list.component.css']
})
export class WeatherListWeekComponent extends BaseWeatherListComponent {
  protected fetchWeatherData(geoLocation: IGeoLocation): Observable<IWeather[]> {

    return this.weatherService.getWeather(geoLocation.lat, geoLocation.lon);
  }

  public isToday(weatherDate: Date) {
    const today = new Date();
    return weatherDate.toDateString() === today.toDateString();
  }
}
