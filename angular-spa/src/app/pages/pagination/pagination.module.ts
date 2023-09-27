import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/shared/core.module';
import { MaterialModule } from 'src/shared/material.module';
import { PaginationComponent } from './pagination.component';
import { paginationRoutes } from './pagination.routes';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CoreModule,
    RouterModule.forRoot(paginationRoutes),
    MaterialModule
  ]
})
export class PlaygroundModule { }
