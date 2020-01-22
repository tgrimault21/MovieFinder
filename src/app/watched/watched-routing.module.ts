import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchedlistComponent } from './components/watchedlist/watchedlist.component';

const routes: Routes = [{ path: '', component: WatchedlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchedRoutingModule { }
