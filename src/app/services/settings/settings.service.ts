import { Injectable } from '@angular/core';
import { Settings } from '../../models/settings';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static key = 'settings';
  private static defaults = new Settings();
  constructor() {}

  public static set(data: Settings): void {
    const mergedData =  { ...SettingsService.defaults, ...data };
    try {
      StorageService.set(SettingsService.key, mergedData);
    } catch (e) {
      console.error('Error saving data', e);
    }
  }

  public static get(): Settings {
    try {
      return StorageService.get(SettingsService.key) || SettingsService.defaults;
    } catch (e) {
      console.error('Error getting data', e);
      return SettingsService.defaults;
    }
  }
}
