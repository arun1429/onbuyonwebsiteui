import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProfileService } from "src/app/services/profile.service";
import { AlertService, UserService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent  implements OnInit {

  open = false;
  selectedId: any;
  orderDetails$: Observable<any>;
  orderStatus = [];
  orderId: string;
  reasonForm: FormGroup;
  orderStatusArray = []
  orderStatusArrayWithoutCancelled = []
  constructor(
    private _PFS: ProfileService,
    public _AS: AlertService,
    private router: Router,
    private _FB: FormBuilder,
    private zone: NgZone
  ) {
    
  }

  ngOnInit(): void {
    this.getAllOrders();
    this.reasonForm = this._FB.group({
      reason: ['', Validators.required]
    })

    this.orderStatusArray = [{
      orderStatus: 1,
      orderString: "Ordered"
    }, {
      orderStatus: 2,
      orderString: "Packed"
    }, {
      orderStatus: 3,
      orderString: "Shipped"
    }, {
      orderStatus: 4,
      orderString: "Delivered"
    }, {
      orderStatus: 5,
      orderString: "Cancelled"
    }]
    this.orderStatusArrayWithoutCancelled = [{
      orderStatus: 1,
      orderString: "Ordered"
    }, {
      orderStatus: 2,
      orderString: "Packed"
    }, {
      orderStatus: 3,
      orderString: "Shipped"
    }, {
      orderStatus: 4,
      orderString: "Delivered"
    }]
  }


  getAllOrders() {
    this.orderDetails$ = this._PFS.getOrderHistory().pipe(
      map(data => {
        const x = data.map(item => {
          let ordersStatus = [];
          let messageStatus = "";
          let message = "";
          ordersStatus.push(
            {
              statusName: "Order",
              statusBool: item.orderStatus === 1 ? true : false
            },
            {
              statusName: "Packed",
              statusBool: item.orderStatus === 2 ? true : false
            },
            {
              statusName: "Shipped",
              statusBool: item.orderStatus === 3 ? true : false
            },
            {
              statusName: "Delivered",
              statusBool: item.orderStatus === 4 ? true : false
            },
            {
              statusName: "Cancelled",
              statusBool: item.orderStatus === 5 ? false : false
            }
          );
          if (item.orderStatus === 1) {
            message = "Your Order is confirmed.";
            messageStatus = "Order is pending for packed";
          }
          else if (item.orderStatus === 2) {
            message = "Your Order is packed.";
            messageStatus = "Order is pending for shipped";
          } else if (item.orderStatus === 8) {
            message = "In processing.";
            messageStatus = "In processing";
          }
          else if (item.orderStatus === 3) {
            message = "Your Order is shipped.";
            messageStatus = "Order will be delivered soon";
          }
          else if (item.orderStatus === 4) {
            message = "Delivered.";
            messageStatus = "Your Order is delivered";
          }
          else if (item.orderStatus === 5) {
            message = "Cancelled.";
            messageStatus = "Your Order is cancelled";
          }
          else {
            message = "Returned.";
            messageStatus = "Your Order is returned";
          }
          return { messageStatus, message, ordersStatus, ...item };
        });
        return x;
      })
    );
  }

  toggle(i, status) {
    if(i===this.selectedId){
      this.selectedId=''
      this.open=false
    }
    else{
      this.selectedId = i;
      this.open = status;
    }
   
  }

  showConfirmModal(orderId: string) {
    this.orderId = orderId;
    $('#reasonModal').modal('show')
    $('#reasonModal').on('hidden.bs.modal', (e) => {
      this.zone.run(() => {
        this.orderId = '';
        this.reasonForm.reset();
      })
    })
  }

  hideConfirmModal() {
    $('#reasonModal').modal('hide')
  }

  cancelOrder() {
    if (this.reasonForm.valid) {
      const cancelOrderData = {
        orderId: this.orderId,
        reason: this.reasonForm.value.reason
      }
      this._PFS.cancelOrder(cancelOrderData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            this.getAllOrders();
            this.hideConfirmModal();
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
          } else {
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        }
      );
    }
    else {
    //  this.alertMessage({ type: "warning", title: "Warning!", value: "Please Write your reason" });
    }
  }

  orderDetails(orderId) {
    this.router.navigateByUrl("/profile/detail?orderId=" + orderId);
  }

  requestInvoiceData(orderId) {
    this._PFS.downloadInvoiceFromVendor(orderId).subscribe(res=>{
      // var mediaType = 'application/pdf';
      //     var blob = new Blob([res], {type: mediaType});
      //     var filename = 'test.pdf';
      //     saveAs(blob, filename);
    })

    // this._PFS.getInvoiceOnMail(orderId).subscribe(
    //   (data: any) => {
    //     if (data.meta.status) {
    //       //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
    //     } else {
    //       //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
    //     }
    //   }
    // )
  }

  getOrderStatusArray(status,productDetails) {
    let data = []
    if (status === 1) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: ''
      }, {
        orderStatus: 2,
        orderString: "InProcess /Cancelled",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: "",
        lineClass: ''
      }]
    }
    else if (status === 8) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 2,
        orderString: "In Process",
        circleClass: true,
        lineClass: ''
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: "",
        lineClass: ''
      }]
    }
    else if (status === 2) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 2,
        orderString: "In Process",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: true,
        lineClass: ''
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: "",
        lineClass: ''
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: "",
        lineClass: ''
      }]
    }
    else if (status === 3) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 2,
        orderString: "In Process",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: true,
        lineClass: ''
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: "",
        lineClass: ''
      }]
    }
    else if (status === 4) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 2,
        orderString: "In Process",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: true,
        lineClass: true
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: true,
        lineClass: ''
      }]
    }

    else if (status === 5) {
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: false,
        lineClass: false,
        inactiveClass: true,
        inactiveLineClass: true
      }, {
        orderStatus: 2,
        orderString: "Cancelled",
        circleClass: false,
        lineClass: false,
        inactiveClass: true,
        inactiveLineClass: ""
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: false,
        lineClass: false,
        inactiveClass: "",
        inactiveLineClass: ""
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: false,
        lineClass: false,
        inactiveClass: "",
        inactiveLineClass: ""
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: false,
        lineClass: false,
        inactiveClass: "",
        inactiveLineClass: ""
      }]
    }
    let findExchange
    let exchangeStatus=false;
    let refundStatus=false
    productDetails.map(el=>{
      if(el.hasOwnProperty('exchange')){
        exchangeStatus=true
      }
      if(el.hasOwnProperty('refund')){
        refundStatus=true
      }
    })
    if(exchangeStatus || refundStatus){
      data = [{
        orderStatus: 1,
        orderString: "Ordered",
        circleClass: true,
        lineClass: true,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: false,
        orangeActiveLineClass: false
      }, {
        orderStatus: 2,
        orderString: "In Process",
        circleClass: true,
        lineClass: true,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: false,
        orangeActiveLineClass: false
      }, {
        orderStatus: 3,
        orderString: "Packed",
        circleClass: true,
        lineClass: true,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: false,
        orangeActiveLineClass: false
      }, {
        orderStatus: 4,
        orderString: "Shipped",
        circleClass: true,
        lineClass: true,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: false,
        orangeActiveLineClass: false
      }, {
        orderStatus: 5,
        orderString: "Delivered",
        circleClass: true,
        lineClass: false,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: false,
        orangeActiveLineClass: true
      },{
        orderStatus: 6,
        orderString: "Exchange/Refund",
        circleClass: false,
        lineClass: false,
        inactiveClass: false,
        inactiveLineClass: false,
        orangeActive: true,
        orangeActiveLineClass: true
      }]
    }

  
    
    return data

  }

  downloadInvoice(orderId){
    //this._PFS.downloadInvoiceFromVendor()
  }

}
