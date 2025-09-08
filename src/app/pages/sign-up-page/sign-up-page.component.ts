import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators as validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [validators.required, validators.email]),
    password: new FormControl('', [validators.required, validators.minLength(6)]),
    confirmPassword: new FormControl('', [validators.required, validators.minLength(6)])
  }, { validators: this.passwordsMatchValidator.bind(this) });

  passwordsMatchValidator(control: AbstractControl) {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  constructor(private auth: Auth, private snackBar: MatSnackBar, private router: Router, private firestore: Firestore ) { }

  async onSubmit() {
    // Mark all controls as touched to show validation errors
    Object.keys(this.signUpForm.controls).forEach(key => {
      this.signUpForm.get(key)?.markAsTouched();
    });
    if (this.signUpForm.valid) {
      const { email, password, confirmPassword } = this.signUpForm.value;
      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match.', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
        const user = userCredential.user;
        // Store user info in Firestore
        await setDoc(doc(this.firestore, 'users', user.uid), {
          email: user.email,
          uid: user.uid,
          createdAt: new Date().toISOString()
        });
        this.snackBar.open('Account created successfully', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
        this.router.navigate(['/']);
      } catch (error) {
        this.snackBar.open('Account creation failed', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
        console.error(error);
      }
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
    }
  }
}

