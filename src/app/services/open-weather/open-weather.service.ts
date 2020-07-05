import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OneCall } from '../../models/one-call';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private static BASE_URL = 'https://api.openweathermap.org/data/2.5';
  private static SAMPLE_URL = '/assets/json/one-call.json';

  constructor(private http: HttpClient) {}

  public get(): Observable<OneCall>{
    return this.http.get<OneCall>(isDevMode() ? OpenWeatherService.SAMPLE_URL : OpenWeatherService.BASE_URL );
  }
}
