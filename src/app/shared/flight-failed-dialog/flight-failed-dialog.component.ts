import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-flight-failed-dialog',
  templateUrl: './flight-failed-dialog.component.html',
  styleUrl: './flight-failed-dialog.component.css'
})
export class FlightFailedDialogComponent {
  constructor(private dialogRef: MatDialogRef<FlightFailedDialogComponent>) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
