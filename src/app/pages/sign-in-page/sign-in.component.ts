import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators as validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  title = 'Sign In Page';

  signInForm = new FormGroup({
    email: new FormControl('', [validators.required, validators.email]),
    password: new FormControl('', [validators.required, validators.minLength(6)])
  });


  constructor(private auth: Auth, private snackBar: MatSnackBar, private router: Router) { }


  async onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      // Handle sign-in logic here, e.g., using Firebase Auth
      try{
        await signInWithEmailAndPassword(this.auth, email!, password!);
        this.snackBar.open('Sign-in successful', 'Close', {
          duration: 4000
        });
        this.router.navigate(['/']);
      } catch (error) {
        this.snackBar.open('Sign-in failed', 'Close', {
          duration: 4000
        });
      }
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Invalid email/password combination.', 'Close', {
        duration: 4000
      });
    }
  }

  async signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(this.auth, provider);
    // result.user contains the signed-in user info
    // Optionally, navigate or show a success message
    this.snackBar.open('Google sign-in successful', 'Close', {
      duration: 4000
    });
    this.router.navigate(['/']);
  } catch (error) {
    // Handle errors (e.g., show a snackbar)
    this.snackBar.open('Google sign-in failed', 'Close', {
      duration: 4000
    });
  }
}
}
