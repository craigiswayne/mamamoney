import {Component, OnDestroy, OnInit} from '@angular/core';
import {iif, interval, Observable, of, Subscription, throwError} from 'rxjs';
import { OneCall } from '../../models/one-call';
import { OpenWeatherService } from '../../services/open-weather/open-weather.service';
import { concatMap, delay, retryWhen, startWith, switchMap, timeout} from 'rxjs/operators';
import { SettingsService } from '../../services/settings/settings.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public oneCall: OneCall;
  public loader = true;

  private notification: MatSnackBarRef<any>;
  private errorRetryCounter = 0;
  private dataSubscription: Subscription;
  private intervalSubscription: Subscription;

  constructor(
      private weatherService: OpenWeatherService,
      private notify: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.fetchData();
    this.fetchController();
  }

  private async fetchController(){
    const interVillain = interval(SettingsService.get().refreshIntervalSeconds * 1000);
    this.intervalSubscription = interVillain.subscribe(() => this.fetchData() );
  }

  private async fetchData(){
    this.loader = true;

    // const retryGuy = retryWhen(errors => errors.pipe(
    //         // Use concat map to keep the errors in order and make sure they
    //         // aren't executed in parallel
    //         concatMap((e, i) =>
    //             iif(
    //                 () => this.getAPIErrorThrottle() > 10,
    //                 this.stopApp(e),
    //                 of(e).pipe(delay(10000))
    //             )
    //         )));

    // this.weatherService.get().pipe(retryGuy).subscribe((resp: OneCall) => {
    //   this.oneCall = resp;
    //   this.loader = false;
    // });

    // Just to illustrate the loader
    setTimeout(() => {
      this.weatherService.get().subscribe((resp: OneCall) => {
        this.oneCall = resp;


        this.loader = false;
        this.notify.open('Updated...', 'OK', {
          duration: 1000
        });
      });
    }, 2000);
  }

  // private async stopApp(e: any){
  //   console.info('No longer making calls to the api', e);
  // }

  // private getAPIErrorThrottle(){
  //   // this.errorRetryCounter = this.errorRetryCounter === 0 ? 2 : this.errorRetryCounter ** 2;
  //   // // if(this.errorRetryCounter > 100){
  //   // //   debugger;
  //   // // }
  //   // return this.errorRetryCounter * 1000;
  //   return this.errorRetryCounter++;
  // }

  ngOnDestroy(){
    this.intervalSubscription.unsubscribe();
  }

}