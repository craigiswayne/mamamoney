import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private snackBarRef: MatSnackBarRef<any>;
  constructor(private snackBar: MatSnackBar, private router: Router) {

    // Close any open notifications when changing urls
    this.router.events.subscribe(event => {

      if (!(event instanceof NavigationEnd)) {
        return;
      }

      if (this.snackBarRef) {
        this.snackBarRef.dismiss();
      }
    });
  }

  private log(text: string, options: object, data?: any): MatSnackBarRef<any> {
    const action = options['action'] || 'OK';
    return this.snackBarRef = this.snackBar.open(text, action, options);
  }

  public info(text: string, data?: any): MatSnackBarRef<any> {
    console.group('Notifier');
    console.log(text, data);
    console.groupEnd();

    return this.log(text, {
      duration: 1000,
      panelClass: 'info'
    }, data );
  }

  public success(text: string, data?: any, options?: {}): MatSnackBarRef<any> {
    const optionsMerged = { ...{
        duration: 1500,
        panelClass: 'success'
      }, ...options };
    return this.log(text, optionsMerged, data );
  }

  public error(text: string, data?: any, options?: {}): MatSnackBarRef<any> {
    const optionsMerged = { ...{
      panelClass: 'error'
    }, ...options };
    return this.log(text, optionsMerged, data );
  }

  public warn(text: string, data?: any, options?: {}): MatSnackBarRef<any> {
    const optionsMerged = { ...{
        panelClass: 'warn'
      }, ...options };
    return this.log(text, optionsMerged, data );
  }
}
