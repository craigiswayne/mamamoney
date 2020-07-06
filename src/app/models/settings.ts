export class Settings {

    public metric: 'fahrenheit' | 'celsius' = 'celsius';
    public refreshIntervalSeconds = 20 * 60; // 20 Minutes
    public minThreshold = 15;
    public maxThreshold = 20;

    private apiRetryTimeoutSeconds = 2;
    get apiRetryTimeout(){
        return this.apiRetryTimeoutSeconds ** 2;
    }
}
