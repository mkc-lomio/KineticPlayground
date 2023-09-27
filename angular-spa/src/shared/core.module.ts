import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule, // @angular/forms
    FormsModule
  ]
})
export class CoreModule { }
