export class Settings {

    public metric: 'fahrenheit' | 'celsius' = 'celsius';
    public refreshIntervalSeconds = 20 * 60; // 20 Minutes

    private apiRetryTimeoutSeconds = 2;
    get apiRetryTimeout(){
        return this.apiRetryTimeoutSeconds ** 2;
    }
}
