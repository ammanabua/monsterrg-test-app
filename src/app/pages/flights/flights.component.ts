import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators as validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FlightSuccessDialogComponent } from '../../shared/flight-success-dialog/flight-success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightFailedDialogComponent } from '../../shared/flight-failed-dialog/flight-failed-dialog.component';
import { FlightInfoPayload } from '../../models/flight-info-payload.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'flights-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css',
})
export class FlightsPageComponent {
  title = 'Welcome to MonsterRG Test App - Flights Page';
  searchAttempted = false;
  activeTab: 'store' | 'retrieve' = 'store';
  today: string = new Date().toISOString().split('T')[0];

  flightForm = new FormGroup({
    airline: new FormControl('', [validators.required, validators.minLength(2), validators.maxLength(30), validators.pattern('^[A-Za-z\\s-]+$')]),
    arrivalDate: new FormControl('', [validators.required]),
    arrivalTime: new FormControl('', [validators.required]),
    flightNumber: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,4}$')]),
    numberOfGuests: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,3}$')]),
    comments: new FormControl('', [validators.pattern('^(?=.*[A-Za-z-])[A-Za-z\\s\\-,\\.]+$')])
  });

  retrieveForm = new FormGroup({
    flightNumber: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,4}$')]),
  });

  retrievedFlight: any = null;

  constructor (private auth: Auth, private firestore: Firestore, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  async storeFlight() {
    // Mark all required controls as touched to show errors
    Object.keys(this.flightForm.controls).forEach(key => {
      const control = this.flightForm.get(key);
      if (control && control.validator && control.hasError('required')) {
        control.markAsTouched();
      }
    });

    //Check if form is valid and user is authenticated
    if (this.flightForm.valid && this.auth.currentUser) {
      const user = this.auth.currentUser;
      const formValue = this.flightForm.value;
      const flightData = {
        ...formValue,
        arrivalDate: formValue.arrivalDate ? formValue.arrivalDate.toString() : '',
        arrivalTime: formValue.arrivalTime ? formValue.arrivalTime.toString() : '',
        userId: user.uid
      };

      // First request: Store in Firestore
      try {
        await addDoc(collection(this.firestore, 'flights'), flightData);
        this.flightForm.reset();
        this.dialog.open(FlightSuccessDialogComponent);
        // Add 3s delay before routing to landing page
        setTimeout(() => {
          this.router.navigate(['/']);
          this.dialog.closeAll();
        }, 2000);
      } catch (error) {
        this.dialog.open(FlightFailedDialogComponent);
        console.error('Error storing flight data: ', error);
      }

      // Second request: POST to challenge API
      try {
        const payload: FlightInfoPayload = {
          airline: formValue.airline ?? null,
          arrivalDate: formValue.arrivalDate ? formValue.arrivalDate.toString() : null,
          arrivalTime: formValue.arrivalTime ? formValue.arrivalTime.toString() : null,
          flightNumber: formValue.flightNumber ?? null,
          numOfGuests: formValue.numberOfGuests !== undefined && formValue.numberOfGuests !== null ? Number(formValue.numberOfGuests) : null,
          comments: formValue.comments ?? null,
        };

        const response = await fetch('https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': environment.token,
            'candidate': environment.candidate
          },
          body: JSON.stringify(payload)
        });
        console.log('Payload sent to challenge API: ', payload);
        console.log('Response from challenge API: ', response); 
        if (!response.ok) {
          console.error('Challenge API request failed');
        }
      } catch (error) {
        console.error('Error sending flight data to challenge API: ', error);
      }
    }
  }


  async retrieveFlight() {
    // Mark as touched to show errors if invalid
    const control = this.retrieveForm.get('flightNumber');
    if (control && control.invalid) {
      control.markAsTouched();
    }
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
          this.retrieveForm.reset();
          // Show feedback: No flight found
          this.snackBar.open('No flight found', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
        } else {
          this.retrievedFlight = querySnapshot.docs[0].data();
          // Show feedback: Flight found
          this.snackBar.open('Flight found', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
        }
      } catch (error) {
        this.searchAttempted = true;
        this.retrievedFlight = null;
        // Show feedback: Error occurred
        this.snackBar.open('Error retrieving flight', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
      }
    }
  }

  async logout() {
    await signOut(this.auth);
    this.snackBar.open('Logout successful', 'Close', {
      duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
    });
    // Optionally, redirect to sign-in page
    this.router.navigate(['/']);
  }
}

