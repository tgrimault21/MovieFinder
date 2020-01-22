import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowatchlistComponent } from './components/towatchlist/towatchlist.component';

const routes: Routes = [{ path: '', component: TowatchlistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToWatchRoutingModule { }
