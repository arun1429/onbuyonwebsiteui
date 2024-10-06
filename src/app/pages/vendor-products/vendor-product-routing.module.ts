import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorProductsComponent } from './vendor-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vendor Products'
    },
    children: [
      { path: ":shopName", component: VendorProductsComponent, data: { title: 'Vendor Products' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorProductRoutingModule { }
