import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
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


  constructor(private auth: Auth, private snackBar: MatSnackBar, private router: Router, private firestore: Firestore) { }


  async onSubmit() {
    // Mark all required controls as touched to show errors
    Object.keys(this.signInForm.controls).forEach(key => {
      const control = this.signInForm.get(key);
      if (control && control.validator && control.hasError('required')) {
        control.markAsTouched();
      }
    });

    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      // Handle sign-in logic here, e.g., using Firebase Auth
      try{
        await signInWithEmailAndPassword(this.auth, email!, password!);
        this.snackBar.open('Sign-in successful', 'Close', {
          duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
        });
        this.router.navigate(['/']);
      } catch (error) {
        this.snackBar.open('Sign-in failed', 'Close', {
          duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
        });
      }
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Invalid email/password combination.', 'Close', {
        duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
      });
    }
  }

  async signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;

    await setDoc(doc(this.firestore, 'users', user.uid), {
      email: user.email,
      uid: user.uid,
      provider: 'google',
      lastLogin: new Date().toISOString()
    }, { merge: true });

    // Optionally, navigate or show a success message
    this.snackBar.open('Google sign-in successful', 'Close', {
      duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
    });
    this.router.navigate(['/flights']);
  } catch (error) {
    // Handle errors (e.g., show a snackbar)
    this.snackBar.open('Google sign-in failed', 'Close', {
      duration: 4000, horizontalPosition: 'end', verticalPosition: 'top'
    });
  }
}
}
