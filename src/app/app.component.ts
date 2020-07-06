import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public currentLocation = 'Cape Town';

  @HostBinding('class') get cssClass(){
    const now = new Date();
    const hourOfDay = now.getHours();
    return hourOfDay >= 18 || hourOfDay <= 4 ? 'night' : 'day';
  }
  constructor(){}
}
