import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: 'watched', loadChildren: () => import('./watched/watched.module').then(m => m.WatchedModule) },
  { path: 'to-watch', loadChildren: () => import('./to-watch/to-watch.module').then(m => m.ToWatchModule) },
  { path: 'list', loadChildren: () => import('./moviemodule/moviemodule.module').then(m => m.MoviemoduleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
