import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public form = new FormGroup({
    metric: new FormControl(null, [Validators.required]),
    refreshIntervalSeconds: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(20 * 60)])
  });

  constructor(private notify: MatSnackBar) {
    const storedSettings = SettingsService.get();
    this.form.patchValue(storedSettings);
    this.form.valueChanges.subscribe(() => this.update());
  }

  ngOnInit(): void {
  }

  public update(): void {
    if (this.form.invalid) {
      return;
    }
    SettingsService.set(this.form.value);
    this.notify.open('Settings Updated', 'OK', {
      duration: 1000
    });
  }
}
