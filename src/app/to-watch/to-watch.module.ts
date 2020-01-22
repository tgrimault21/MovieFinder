import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToWatchRoutingModule } from './to-watch-routing.module';
import { TowatchlistComponent } from './components/towatchlist/towatchlist.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [TowatchlistComponent],
  imports: [
    CommonModule,
    ToWatchRoutingModule,
    SharedModule,
    MatCardModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ToWatchModule { }
