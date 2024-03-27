import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { IGeoLocation } from '../../weatherDashboard/interfaces/geoLocation.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  private readonly http = inject(HttpClient);

  getGeocoding(city: string): Observable<IGeoLocation> {
    return this.http
      .get<
        IGeoLocation[]
      >(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c1e8801ee9388d9c8d6207ac75aa793b`)
      .pipe(map((response: IGeoLocation[]) => response[0]));
  }

  getReverseGeocoding(lat: number, lon: number): Observable<IGeoLocation> {
    return this.http
      .get<
        IGeoLocation[]
      >(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=c1e8801ee9388d9c8d6207ac75aa793b`)
      .pipe(map((response: IGeoLocation[]) => response[0]));
  }

  getCurrentPosition(): Observable<IGeoLocation> {
    return new Observable<GeolocationPosition>(observer => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position);
            observer.complete();
          },
          error => observer.error(error)
        );
      } else {
        observer.error('Geolocation is not available in this browser.');
      }
    }).pipe(
      switchMap((position: GeolocationPosition) =>
        this.getReverseGeocoding(
          position.coords.latitude,
          position.coords.longitude
        )
      ),
      catchError(error => throwError(error))
    );
  }
}
