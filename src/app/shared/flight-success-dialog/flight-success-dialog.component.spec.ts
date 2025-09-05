import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSuccessDialogComponent } from './flight-success-dialog.component';

describe('FlightSuccessDialogComponent', () => {
  let component: FlightSuccessDialogComponent;
  let fixture: ComponentFixture<FlightSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSuccessDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
