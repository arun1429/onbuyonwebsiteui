import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllVendorsComponent } from './allvendors/allvendors.component';
import { VendorProductsComponent } from './vendors/vendor-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Vendors'
    },
    children: [
      { path: "", component: AllVendorsComponent, data: { title: 'Vendors' } },
      { path: ":shopName", component: VendorProductsComponent, data: { title: 'Vendor Products' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllVendorsRoutingModule { }
