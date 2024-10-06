import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialOfferProductsComponent } from './specialoffer-products.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Special Offer'
    },
    children: [
      { path: "", component: SpecialOfferProductsComponent, data: { title: 'Special Offer' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialOfferProductsRoutingModule { }
