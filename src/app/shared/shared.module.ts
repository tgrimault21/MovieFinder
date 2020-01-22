import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { API_BASE_URL, API_KEY } from './services/tokens';
import { MovieComponent } from './movie/movie.component';
import { MatCardModule, MatButtonToggleModule, MatTooltipModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [
    MovieComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatIconModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'https://api.themoviedb.org/3' },
    { provide: API_KEY, useValue: '9e2b8a1d23b0a9148f8bb5bf8f512bd8' },
  ],
  exports: [
    MovieComponent
  ]
})
export class SharedModule { }
