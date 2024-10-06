import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishListComponent } from './wishlist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wish List'
    },
    children: [
      { path: "", component: WishListComponent, data: { title: 'Wish List' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishListRoutingModule { }
