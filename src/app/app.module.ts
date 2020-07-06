import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherMetricPipe } from './pipes/weather-metric.pipe';
import { UnixDatePipe } from './pipes/unix-date.pipe';
import { HomeComponent } from './views/home/home.component';
import { SettingsComponent } from './views/settings/settings.component';
import { OpenWeatherIconPipe } from './pipes/openweather-icon.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { StorageService } from './services/storage/storage.service';
import { SettingsService } from './services/settings/settings.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    WeatherMetricPipe,
    UnixDatePipe,
    OpenWeatherIconPipe,
    SettingsComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    StorageService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
