import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators as validators, ReactiveFormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'monsterrg-test-app';

  activeTab: 'store' | 'retrieve' = 'store';

  flightForm = new FormGroup({
    airline: new FormControl('', [validators.required]),
    arrivalDate: new FormControl('', [validators.required]),
    arrivalTime: new FormControl('', [validators.required]),
    flightNumber: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,4}$')]),
    numberOfGuests: new FormControl('', [validators.required, validators.pattern('^[0-9]{1,3}$')]),
    comments: new FormControl('')
  });
}

