import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFailedDialogComponent } from './flight-failed-dialog.component';

describe('FlightFailedDialogComponent', () => {
  let component: FlightFailedDialogComponent;
  let fixture: ComponentFixture<FlightFailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightFailedDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
