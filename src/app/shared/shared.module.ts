import { NgModule, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, InjectionToken } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { API_BASE_URL, API_KEY } from './services/tokens';
import { MovieComponent } from './movie/movie.component';
import { MatCardModule, MatButtonToggleModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { LocalStorageService } from './services/localStorage/localStorage.service';
import { MockService } from './services/localStorage/mock.service';

export const loadLocalService = (platformId: string) => {
  if (isPlatformBrowser(platformId)) {
    return new LocalStorageService();
  }
  return new MockService();
};

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
    { provide: LocalStorageService, useFactory: loadLocalService, deps: [PLATFORM_ID]}
  ],
  exports: [
    MovieComponent
  ]
})
export class SharedModule { }
