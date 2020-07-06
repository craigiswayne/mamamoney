import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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
    refreshIntervalSeconds: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(20 * 60)]),
    minThreshold: new FormControl(null, [Validators.required]),
    maxThreshold: new FormControl(null, [Validators.required])
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

    const minThreshold = this.form.get('minThreshold').value;
    const maxThreshold = this.form.get('maxThreshold').value;

    // Couldn't get my custom validator to work
    if (minThreshold >= maxThreshold) {
      this.notify.open('Thresholds are invalid', 'OK', {
        panelClass: 'error'
      });
      return;
    }

    SettingsService.set(this.form.value);
    this.notify.open('Settings Updated', 'OK', {
      duration: 1000
    });
  }

  // private thresholdValidator(control: AbstractControl): { [key: string]: boolean } | null {
  //   const form = control.parent as FormGroup;
  //   if (!form) {
  //     return null;
  //   }
  //   const minThreshold = form.get('minThreshold').value;
  //   const maxThreshold = form.get('maxThreshold').value;
  //
  //   if (!minThreshold || !maxThreshold) {
  //     return null;
  //   }
  //
  //   if (minThreshold < maxThreshold) {
  //     return null;
  //   }
  //
  //   return {
  //     threshold: true
  //   };
  // }
}
