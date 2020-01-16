import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { TowatchlistComponent } from './components/towatchlist/towatchlist.component';
import { WatchedlistComponent } from './components/watchedlist/watchedlist.component';


const routes: Routes = [
  { path: 'list', component: MoviesComponent },
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'to-watch', component: TowatchlistComponent },
  { path: 'watched', component: WatchedlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
