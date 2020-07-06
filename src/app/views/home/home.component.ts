import {Component, OnDestroy, OnInit} from '@angular/core';
import { OneCall } from '../../models/one-call';
import { OpenWeatherService } from '../../services/open-weather/open-weather.service';
import { SettingsService } from '../../services/settings/settings.service';
import { WeatherMetricPipe } from '../../pipes/weather-metric.pipe';
import { NotifierService } from '../../services/notifier/notifier.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { WeatherMetric } from '../../models/weather-metric.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [WeatherMetricPipe]
})
export class HomeComponent implements OnInit, OnDestroy {

  public oneCall: OneCall;
  public loader = true;
  private intervalSubscription;

  public get usersMetric(): WeatherMetric {
    return SettingsService.get().metric;
  }
  private pollDelay = SettingsService.get().refreshIntervalSeconds;
  private errorDelay = 2;
  private hasErrorStore = false;
  private get hasError(): boolean {
    return this.hasErrorStore;
  }
  private set hasError(val: boolean) {
    this.hasErrorStore = val;
    if (val) {
      clearInterval(this.intervalSubscription);
      this.pollDelay = this.errorDelay = this.errorDelay ** 2;
      this.poll();
    } else {
      this.errorDelay = 2;
      this.pollDelay = SettingsService.get().refreshIntervalSeconds;
    }
  }

  constructor(
    private weatherService: OpenWeatherService,
    private weatherMetricPipe: WeatherMetricPipe,
    private notify: NotifierService
  ) { }

  async ngOnInit() {
    this.fetchData();
    this.poll();
  }

  private async fetchData() {
    this.loader = true;
    this.weatherService.get().subscribe((resp: OneCall) => {
      this.hasError = false;
      this.oneCall = resp;
      this.loader = false;
      this.notify.success('Updated', resp );
      this.checkThresholds();
    }, error => {
      this.loader = false;
      this.hasError = true;
      this.notify.error(`An Error Occurred.\nTrying again in ${this.pollDelay} seconds...`, error, {
        action: 'Retry Now'
      }).onAction().subscribe(() => {
        this.fetchData();
      });
    });
  }

  private poll() {
    this.intervalSubscription = setInterval(() => {
      this.fetchData();
    }, this.pollDelay * 1000 );
  }

  private checkThresholds(){
    const minThreshold = SettingsService.get().minThreshold;
    const maxThreshold = SettingsService.get().maxThreshold;

    const currentTemp = parseInt(this.weatherMetricPipe.transform(this.oneCall.current.temp.toString()), 10);
    if (currentTemp >= minThreshold && currentTemp <= maxThreshold){
      return null;
    }

    this.notify.warn('Current Temp breaches thresholds');
  }

  public updateMetric(event: MatSlideToggleChange){
    const settings = SettingsService.get();
    settings.metric = event.checked ? WeatherMetric.FAHRENHEIT : WeatherMetric.CELSIUS;
    SettingsService.set(settings);
  }

  ngOnDestroy(){
    if (this.intervalSubscription) {
      clearInterval(this.intervalSubscription);
    }
  }

}
