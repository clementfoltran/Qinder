import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import {IsLoggedInGuard} from './guards/is-logged-in-guard';
import { SettingsComponent } from './settings/settings.component';
import {IsLoggedOutGuard} from './guards/is-logged-out-guard';
import { EnterViewSettingsResolve } from './settings/services/enter-view-settings.resolve';
import { EnterViewActivateResolve } from './landing-page/services/enter-view-activate/enter-view-activate.resolve';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'settings/:id',
    component: SettingsComponent,
    canActivate: [IsLoggedInGuard],
    resolve: {viewData: EnterViewSettingsResolve}
  },
  {
    path: 'activate/:email/:key',
    component: LandingPageComponent,
    canActivate: [IsLoggedOutGuard],
    resolve: {viewData: EnterViewActivateResolve}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    IsLoggedInGuard,
    IsLoggedOutGuard
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
