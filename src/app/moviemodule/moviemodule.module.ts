import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviemoduleRoutingModule } from './moviemodule-routing.module';
import { MoviesComponent } from '../moviemodule/components/movies/movies.component';
import { InformationsComponent } from '../moviemodule/components/informations/informations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule, MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    MoviesComponent,
    InformationsComponent
  ],
  imports: [
    CommonModule,
    MoviemoduleRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  entryComponents: [InformationsComponent]
})
export class MoviemoduleModule { }
