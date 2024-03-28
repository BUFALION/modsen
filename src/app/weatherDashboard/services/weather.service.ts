import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IWeather } from '../interfaces/weather.interface';
import {IWeatherDailyResponse, IWeatherHourlyResponse} from '../interfaces/weatherResponse.interface';
import { getPhotoUrl } from '../utils/weatherPhoto.utils';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly http = inject(HttpClient);

  getWeather(lat: number, lon: number): Observable<IWeather[]> {
    return this.http
      .get<IWeatherDailyResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&next_days=7`
      )
      .pipe(
        map((response: IWeatherDailyResponse) => {
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

  getWeatherHourly(lat: number, lon: number): Observable<IWeather[]> {
    return this.http.get<IWeatherHourlyResponse>(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&forecast_days=1`
    ).pipe(
      map((response: IWeatherHourlyResponse) =>{
        return response.hourly.time.map((date: string, index: number) => ({
          date: new Date(date),
          currentTemp: Math.floor(response.hourly.temperature_2m[index]),
          weatherCode: response.hourly.weather_code[index],
          imgUrl: getPhotoUrl(response.hourly.weather_code[index]),
        }));
        })

    )


  }
}
