import {WeatherMetric} from './weather-metric.enum';

export class Settings {

    public metric: WeatherMetric = WeatherMetric.CELSIUS;
    public minThreshold = 15;
    public maxThreshold = 20;
    public refreshIntervalSeconds = 20 * 60; // 20 Minutes

    private apiRetryTimeoutSeconds = 2;
    get apiRetryTimeout(){
        return this.apiRetryTimeoutSeconds ** 2;
    }
}
