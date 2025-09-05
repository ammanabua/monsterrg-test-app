import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in-page/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './auth.guard';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

export const routes: Routes = [
    { path: '/', component: HomePageComponent, canActivate: [authGuard] },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpPageComponent }
];

