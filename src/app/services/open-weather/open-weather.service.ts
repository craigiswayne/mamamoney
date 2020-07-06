import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OneCall } from '../../models/one-call';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  private static CAPE_TOWN_LATITUDE = '-33.9258';
  private static CAPE_TOWN_LONGITUDE = '18.4232';
  private static API_KEY = '924056984a08d30973c685b75d1119f8';
  private static BASE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${OpenWeatherService.CAPE_TOWN_LATITUDE}&lon=${OpenWeatherService.CAPE_TOWN_LONGITUDE}&appid=${OpenWeatherService.API_KEY}`;
  private static SAMPLE_URL = '/assets/json/one-call.json';

  constructor(private http: HttpClient) {}

  public get(): Observable<OneCall>{
    return this.http.get<OneCall>(isDevMode() ? OpenWeatherService.SAMPLE_URL : OpenWeatherService.BASE_URL );
    // return this.http.get<OneCall>(OpenWeatherService.BASE_URL);
  }
}
