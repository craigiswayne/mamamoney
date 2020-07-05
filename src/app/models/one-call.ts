/* tslint:disable */
class WeatherOverview {
    readonly id: number;
    readonly main: string;
    readonly description: string;
    readonly icon: string;
}

class CurrentItem {
    readonly dt: number;
    readonly sunrise: number;
    readonly sunset: number;
    readonly temp: number;
    readonly feels_like: number;
    readonly pressure: number;
    readonly humidity: number;
    readonly dev_point: number;
    readonly uvi: number;
    readonly clouds: number;
    readonly visibility: number;
    readonly wind_speed: number;
    readonly wind_deg: number;
    readonly weather: WeatherOverview[];
    readonly rain: object;
}

class ForecastItemTemp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

class ForecastItem {
    public dt: number;
    public sunrise: number;
    public sunset: number;
    public temp: ForecastItemTemp = new ForecastItemTemp();
    public feels_like: object;
    public pressure: number;
    public humidity: number;
    public dew_point: number;
    public wind_speed: number;
    public wind_deg: number;
    public weather: WeatherOverview[] = [new WeatherOverview()];
    public clouds: number;
    public rain: number;
    public uvi: number;
}

export class OneCall {
    readonly lat: number;
    readonly lon: number;
    readonly timezone: string;
    readonly timezone_offset: number;
    readonly current: CurrentItem = new CurrentItem();
    readonly hourly: ForecastItem[];
    readonly daily: ForecastItem[];
}
