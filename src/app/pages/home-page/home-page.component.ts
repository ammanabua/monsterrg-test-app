import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators as validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  title = 'Welcome to MonsterRG Test App - Home Page';
  searchAttempted = false;
  activeTab: 'store' | 'retrieve' = 'store';

  flightForm = new FormGroup({
    airline: new FormControl('', [validators.required]),
    arrivalDate: new FormControl('', [validators.required]),
    arrivalTime: new FormControl('', [validators.required]),
    flightNumber: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,4}$')]),
    numberOfGuests: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,3}$')]),
    comments: new FormControl('')
  });

  retrieveForm = new FormGroup({
    flightNumber: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,4}$')]),
  });

  retrievedFlight: any = null;

  constructor (private auth: Auth, private firestore: Firestore, private router: Router) { }

  async storeFlight() {
    if (this.flightForm.valid && this.auth.currentUser) {
      const user = this.auth.currentUser;
      console.log('Storing flight for user:', user.uid);
      const formValue = this.flightForm.value;
      const flightData = {
        ...formValue,
        arrivalDate: formValue.arrivalDate ? formValue.arrivalDate.toString() : '',
        arrivalTime: formValue.arrivalTime ? formValue.arrivalTime.toString() : '',
        userId: user.uid
      };
      try {
        await addDoc(collection(this.firestore, 'flights'), flightData);
        alert('Flight stored successfully!');
        this.flightForm.reset();
      } catch (error) {
        alert('Error storing flight');
        console.error(error);
      }
    }
  }

  async retrieveFlight() {
    this.searchAttempted = false;
    this.retrievedFlight = null;
    if (this.auth.currentUser && this.retrieveForm.valid) {
      const userId = this.auth.currentUser.uid;
      const flightNumber = this.retrieveForm.value.flightNumber;
      const flightsRef = collection(this.firestore, 'flights');
      const q = query(flightsRef, 
        where('flightNumber', '==', flightNumber),
        where('userId', '==', userId)
      );
      try {
        const querySnapshot = await getDocs(q);
        this.searchAttempted = true;
        if (querySnapshot.empty) {
          this.retrievedFlight = null;
          // Show feedback: No flight found
          // e.g., this.snackBar.open('No flight found', 'Close', { duration: 4000 });
        } else {
          this.retrievedFlight = querySnapshot.docs[0].data();
          // Show feedback: Flight found
          // e.g., this.snackBar.open('Flight found', 'Close', { duration: 4000 });
        }
      } catch (error) {
        this.searchAttempted = true;
        this.retrievedFlight = null;
        // Show feedback: Error occurred
        // e.g., this.snackBar.open('Error retrieving flight', 'Close', { duration: 4000 });
        console.error(error);
      }
    }
  }

  async logout() {
    await signOut(this.auth);
    // Optionally, redirect to sign-in page
    this.router.navigate(['/sign-in']);
  }
}

