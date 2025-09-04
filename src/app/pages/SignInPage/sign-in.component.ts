import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators as validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  title = 'Sign In Page';

  signInForm = new FormGroup({
    email: new FormControl('', [validators.required, validators.email]),
    password: new FormControl('', [validators.required, validators.minLength(6)])
  });

  constructor(private auth: Auth) { }


  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      // Handle sign-in logic here, e.g., using Firebase Auth
      console.log('Form Submitted!', { email, password });
    } else {
      console.log('Form is invalid');
    }
  }
}
