import {Directive, inject, OnInit} from "@angular/core";
import {WeatherService} from "../../../services/weather.service";
import {GeoLocationService} from "../../../../shared/services/geo-location.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {IWeather} from "../../../interfaces/weather.interface";
import {IGeoLocation} from "../../../interfaces/geoLocation.interface";

@Directive()
export abstract class BaseWeatherListComponent implements OnInit {
  protected readonly weatherService = inject(WeatherService);
  protected readonly geoLocationService = inject(GeoLocationService);
  protected readonly route = inject(ActivatedRoute);

  public weatherData$: Observable<IWeather[]>;

  ngOnInit(): void {
    this.initializeValues();
  }

  protected initializeValues() {
    this.weatherData$ = this.route.parent!.params.pipe(
      switchMap(params => {
        const city = params['city'];
        return this.geoLocationService.getGeocoding(city);


      }),
      switchMap((geoLocation: IGeoLocation) => this.fetchWeatherData(geoLocation))
    );
  }

  protected abstract fetchWeatherData(geoLocation: IGeoLocation): Observable<IWeather[]>;
}
