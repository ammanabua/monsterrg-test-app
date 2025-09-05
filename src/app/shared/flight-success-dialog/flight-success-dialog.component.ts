import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-success-dialog',
  templateUrl: './flight-success-dialog.component.html',
  styleUrl: './flight-success-dialog.component.css'
})
export class FlightSuccessDialogComponent {
  constructor(private dialogRef: MatDialogRef<FlightSuccessDialogComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
