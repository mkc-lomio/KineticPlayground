import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReimbursementModalComponent } from './employee-reimbursement-modal.component';

describe('EmployeeReimbursementModalComponent', () => {
  let component: EmployeeReimbursementModalComponent;
  let fixture: ComponentFixture<EmployeeReimbursementModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeReimbursementModalComponent]
    });
    fixture = TestBed.createComponent(EmployeeReimbursementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
