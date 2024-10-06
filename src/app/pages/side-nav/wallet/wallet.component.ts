import { Component, NgZone, OnInit } from '@angular/core';
import { ProfileService } from "src/app/services/profile.service";


import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AlertService, WidnowRefService } from 'src/app/_services';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent  implements OnInit {

  referralEarning: number = 0;
  walletAmount: number = 0;
  showAddMoney: Boolean = false;
  paymentId: any;
  amount: number = 100;
  requiredMoney: any;
  txnHistory: any = [];
  txnHistoryShow: Boolean = false;
  currentPageNumber = 1
  rewardPoints = 0;

  constructor(
    private _PFS: ProfileService,
    public _AS: AlertService,
    private winRef: WidnowRefService,
    private zone: NgZone,@Inject(PLATFORM_ID) private platformId: Object
  ) {
    
  }

  ngOnInit(): void {
    this._PFS.getEmittedMoney().subscribe(x => {
      this.requiredMoney = Number(x);
    });
    this.getMyWallet();
  }

  getMyWallet() {
    this._PFS.getWallet().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.walletAmount = data.data.walletBalance;
          this.moneyAddedByUserDuringPurchase(this.requiredMoney);
          this.getTransactionHistory();
        }
      }
    )
  }

  getTransactionHistory() {
    this._PFS.getTransactionHistory().subscribe(
      (data: any) => {
        if (data.meta.status) {
          this.txnHistory = data.data;
          // this.getRewardPoints()
        }
      }
    )
  }

  // getRewardPoints() {
  //   this._PFS.getRewardPoints().subscribe(res => {
  //     if (res) {
  //       this.rewardPoints = res.totalCoin ? res.totalCoin : 0
  //     }
  //   })
  // }

  moneyAddedByUserDuringPurchase(moneyAdded) {
    if (moneyAdded !== 0) {
      this.showAddMoney = true;
      this.amount = Number(moneyAdded);
    } else {
      this.showAddMoney = false;
    }
  }

  initPay(money) {
    if (isPlatformBrowser(this.platformId)) {
    let options: any = {
      key: environment.rzpKey,
      amount: Number(money) * Number(100),
      currency: "INR",
      buttontext: "Pay",
      name: "OnBuyOn",
      "prefill.name": localStorage.getItem("fullName"),
      "prefill.email": localStorage.getItem("userEmailId"),
      "theme.color": "#F37254",
      handler: ((response, error) => {
        this.zone.run(() => {
          this.paymentCapture(response)
        })
        // call your backend api to verify payment signature & capture transaction
      }),
      modal: {
        ondismiss: function () {
        }
      }
    };
    var rzp1 = new this.winRef.nativeWindow.Razorpay(options);
    rzp1.open();
  }
  }

  paymentCapture(response) {
    this.paymentId = response.razorpay_payment_id;
    const body = {
      paymentId: this.paymentId
    };
    this._PFS.updatePaymentStatus(body).subscribe(
      (data: any) => {
        this.zone.run(()=>{
          if (data.meta.status) {
            this.walletAmount = data["data"].walletBalance;
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
            this.ngOnInit();
          }
        })
      }
    );
  }

  refreshpage() {
  //  this.alertMessage({ type: "success", title: "Success", value: "Wallet Balance Addition Successfull" });
    this.ngOnInit();
  }

  showAddMoneyDiv() {
    this.showAddMoney = !this.showAddMoney;
    this.txnHistoryShow = false;
  }
  selectMoney(money) {
    this.amount = money;
  }
  showTxnHistory() {
    this.txnHistoryShow = !this.txnHistoryShow;
    this.showAddMoney = false;
  }

  pageChanged(event) {
    this.currentPageNumber = event
  }

}
