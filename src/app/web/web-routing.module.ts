import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponent } from './web.component';
import { FormComponent } from './pages/form/form.component';

const routes: Routes = [
  {
     path:"",
     redirectTo:"form",
     pathMatch:"full"
  },
  {
    path:"",
    component:WebComponent,
    children:[
      {
         path:"form",
         component:FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
