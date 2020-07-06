import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  private snackBarRef: MatSnackBarRef<any>;
  constructor(private snackBar: MatSnackBar) {}

  private log(text: string, options: object, data?: any): MatSnackBarRef<any> {
    return this.snackBarRef = this.snackBar.open(text, 'OK', options);
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

  public success(text: string, data?: any): MatSnackBarRef<any> {
    return this.log(text, {
      duration: 1500,
      panelClass: 'success'
    }, data );
  }

  public error(text: string, data?: any): MatSnackBarRef<any> {
    return this.log(text, {
      panelClass: 'error'
    }, data );
  }

  public warn(text: string, data?: any): MatSnackBarRef<any> {
    return this.log(text, {
      panelClass: 'warn'
    }, data );
  }
}