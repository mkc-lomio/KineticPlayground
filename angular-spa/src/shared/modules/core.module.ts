import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule, // @angular/forms
    FormsModule,
    HttpClientModule
  ]
})
export class CoreModule { }
