import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'openWeatherIcon'})
export class OpenWeatherIconPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return null;
        }
        return `//openweathermap.org/img/wn/${value}.png`;
    }
}
