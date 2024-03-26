import { Component, Input } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { IWeather } from '../interfaces/weather.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [NgForOf, NgIf, DatePipe, AsyncPipe],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.css',
})
export class WeatherListComponent {
  @Input() weatherData$: Observable<IWeather[]>;
}
