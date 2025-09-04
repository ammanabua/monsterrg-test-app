import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in-page/sign-in.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'sign-in', component: SignInComponent }
];

