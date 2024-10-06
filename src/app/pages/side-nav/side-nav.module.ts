import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule ,FormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/_pipes/pipes.module';
import { SideNavComponent } from './side-nav.component';
import { SideNavRoutingModule } from './side-nav-routing.module';
import { AccountComponent } from './account/account.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotificationComponent } from '../notification/notification.component';
import { WalletComponent } from './wallet/wallet.component';
import { AddressComponent } from './address/address.component';
import { AddAddressComponent } from './address/add-address/add-address.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [SideNavComponent,AccountComponent,OrderDetailComponent,OrderHistoryComponent,NotificationComponent,WalletComponent,AddressComponent,AddAddressComponent,AddressListComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgxDropzoneModule,
    SideNavRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule ,
    NgxSpinnerModule,
    NgSelectModule,
    NgTemplateOutlet
  ]
})
export class SideNavModule { }
