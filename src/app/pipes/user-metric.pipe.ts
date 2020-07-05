import { Pipe, PipeTransform } from '@angular/core';
import {SettingsService} from '../services/settings/settings.service';

@Pipe({name: 'userMetric'})
export class UserMetricPipe implements PipeTransform {
    transform(input: string): number|'?' {

        const kelvin = parseFloat(input);
        const usersMetric = SettingsService.get().metric;
        let converted = kelvin;

        switch ( usersMetric ){
            case 'celsius':
                converted = kelvin - 273.15;
                break;
            case 'fahrenheit':
                converted = ((kelvin - 273.15) * ( 9 / 5 )) + 32;
                break;
        }

        const result = Math.round(converted);
        return isNaN(result) ? '?' : result;
    }
}
