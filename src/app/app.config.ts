import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "monster-test-app", appId: "1:594973351803:web:6920dddb7c3a95f15c27de", storageBucket: "monster-test-app.firebasestorage.app", apiKey: "AIzaSyAIMrB4eYvKmE-jC1m8G_jl6VxsNMkHiHw", authDomain: "monster-test-app.firebaseapp.com", messagingSenderId: "594973351803", measurementId: "G-ZJV5L0PYMF" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideMessaging(() => getMessaging())]
};
