import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Checkout'
    },
    children: [
      { path: "", component: CheckoutComponent, data: { title: 'Checkout' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
