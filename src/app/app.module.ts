import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InformationsComponent } from './components/informations/informations.component';
import { WatchedlistComponent } from './components/watchedlist/watchedlist.component';
import { TowatchlistComponent } from './components/towatchlist/towatchlist.component';
import { API_BASE_URL, API_KEY } from './services/tokens';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InformationsComponent,
    WatchedlistComponent,
    TowatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatTabsModule,
    MatTooltipModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
    { provide: API_KEY, useValue: '9e2b8a1d23b0a9148f8bb5bf8f512bd8' },
  ],
  bootstrap: [AppComponent],
  entryComponents: [InformationsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
