import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather.interface';
import { IWeatherResponse } from '../interfaces/weatherResponse.interface';
import { getPhotoUrl } from '../utils/weatherPhoto.utils';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeather(lat: number, lon: number): Observable<IWeather[]> {
    return this.http
      .get<IWeatherResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&next_days=7`
      )
      .pipe(
        map((response: IWeatherResponse) => {
          return response.daily.time.map((date: string, index: number) => ({
            date: new Date(date),
            minTemp: Math.floor(response.daily.temperature_2m_min[index]),
            maxTemp: Math.floor(response.daily.temperature_2m_max[index]),
            weatherCode: response.daily.weather_code[index],
            imgUrl: getPhotoUrl(response.daily.weather_code[index]),
          }));
        })
      );
  }
}
