import { Injectable } from '@angular/core';
import { Settings } from '../../models/settings';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private static key = 'mamaMoney';

  constructor() {}

  public static set(key: string, data: object): void {
    try {
      localStorage.setItem(`${StorageService.key}_${key}`, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data', e);
    }
  }

  public static get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(`${StorageService.key}_${key}`));
    } catch (e) {
      console.error('Error getting data', e);
      return null;
    }
  }
}
