import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-weather-toggler',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './weather-toggler.component.html',
  styleUrl: './weather-toggler.component.css',
})
export class WeatherTogglerComponent {}
