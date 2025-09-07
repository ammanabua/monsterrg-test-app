import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in-page/sign-in.component';
import { authGuard } from './auth.guard';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FlightsPageComponent } from './pages/flights/flights.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpPageComponent },
    { path: 'flights', component: FlightsPageComponent, canActivate: [authGuard] },
];

