import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav.component';
import { AccountComponent } from './account/account.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotificationComponent } from '../notification/notification.component';
import { WalletComponent } from './wallet/wallet.component';
import { AddressComponent } from './address/address.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SideNavComponent,
    data: {
      title: 'Side Nav'
    },
    children: [
      { path: "account", component: AccountComponent, data: { title: 'Accounts' } },
      { path: "order-history", component: OrderHistoryComponent, data: { title: 'Order History' } },
      { path: "notifications", component: NotificationComponent, data: { title: 'Notifications' } },
      { path: "wallet", component: WalletComponent, data: { title: 'Wallet' } },
      { path: "address", component: AddressComponent, data: { title: 'Address' } },
      { path: "detail", component: OrderDetailComponent, data: { title: 'Order Details' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideNavRoutingModule { }
