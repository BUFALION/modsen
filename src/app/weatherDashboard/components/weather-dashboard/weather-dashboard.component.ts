import { Component, inject, OnInit } from '@angular/core';
import { WeatherListComponent } from '../weather-list/weather-list.component';
import { WeatherService } from '../services/weather.service';
import { IWeather } from '../interfaces/weather.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [WeatherListComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);

  public weatherData$: Observable<IWeather[]>;

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues() {
    this.weatherData$ = this.weatherService.getWeather();
  }



}
