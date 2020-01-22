import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchedRoutingModule } from './watched-routing.module';
import { WatchedlistComponent } from './components/watchedlist/watchedlist.component';
import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material';


@NgModule({
  declarations: [WatchedlistComponent],
  imports: [
    CommonModule,
    WatchedRoutingModule,
    SharedModule,
    MatCardModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class WatchedModule { }
