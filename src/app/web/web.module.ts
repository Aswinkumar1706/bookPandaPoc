import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { FormComponent } from './pages/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WebComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    WebRoutingModule,ReactiveFormsModule, FormsModule
  ]
})
export class WebModule { }
