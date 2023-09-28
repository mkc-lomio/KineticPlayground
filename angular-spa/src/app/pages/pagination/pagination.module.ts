import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/shared/modules/core.module';
import { MaterialModule } from 'src/shared/modules/material.module';
import { PaginationComponent } from './pagination.component';
import { paginationRoutes } from './pagination.routes';
import { EmployeeReimbursementModalComponent } from './employee-reimbursement-modal/employee-reimbursement-modal.component';



@NgModule({
  declarations: [PaginationComponent, EmployeeReimbursementModalComponent],
  imports: [
    CoreModule,
    RouterModule.forRoot(paginationRoutes),
    MaterialModule
  ]
})
export class PaginationModule { }
