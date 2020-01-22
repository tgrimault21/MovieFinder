import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviemoduleRoutingModule } from './moviemodule-routing.module';
import { MoviesComponent } from '../moviemodule/components/movies/movies.component';
import { InformationsComponent } from '../moviemodule/components/informations/informations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';


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
    MatButtonModule
  ],
  entryComponents: [InformationsComponent]
})
export class MoviemoduleModule { }
