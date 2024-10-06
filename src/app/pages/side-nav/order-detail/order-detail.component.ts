import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ProfileService } from 'src/app/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services';
declare var $: any
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent  implements OnInit {

  orderID: any
  myOrderId: any
  orderData$: Observable<any>;
  exchangeFormGroup: FormGroup;
  refundFormGroup: FormGroup;
  selectedExchangeReason = [];
  selectedRefundReason = [];
  selectedExchangeString:any
  selectedRefundString:any
  exchangeReason = [
    { id: 1, name: 'Quality' },
    { id: 2, name: 'Product Missing' },
    { id: 3, name: 'Price' },
    { id: 4, name: 'Defective / Broken' },
    { id: 5, name: 'Size' },
    { id: 6, name: 'Colour/Design' },
    { id: 7, name: 'No longer needed}' }
  ]

  refundReason = [
    { id: 1, name: 'Quality' },
    { id: 2, name: 'Product Missing' },
    { id: 3, name: 'Price' },
    { id: 4, name: 'Defective / Broken' },
    { id: 5, name: 'Size' },
    { id: 6, name: 'Colour/Design' }
  ]

  exchangeFiles: File[] = []
  refundFiles: File[] = []
  exchangeFilesVideo: File[] = []
  refundFilesVideo: File[] = []
  constructor(
    private actRoute: ActivatedRoute,
    private _PFS: ProfileService,
    private _FB: FormBuilder,
    public _AS: AlertService
  ) {
  
  }

  ngOnInit(): void {
    this.exchangeFormControl();
    this, this.refundFormControl();
    this.actRoute.queryParams.subscribe(params => {
      this.orderID = params.orderId
    })
    this.getOrderDetails();

  }

  exchangeFormControl() {
    this.exchangeFormGroup = this._FB.group({
      comment: [''],
      image: [''],
      productVideo: [''],
    })
  }

  refundFormControl() {
    this.refundFormGroup = this._FB.group({
      comment: [''],
      image: [''],
      productVideo: [''],
    })
  }

  getOrderDetails() {
    this.orderData$ = this._PFS.getOrderDetailsByOrderId(this.orderID).pipe(map(
      res => {
        let status = '';
        this.myOrderId = res.orderID
        status = res.orderStatus === 1 ? 'Ordered' : res.orderStatus === 2 ? 'Packed' : res.orderStatus === 3 ? 'Shipped' : res.orderStatus === 4 ? 'Delivered' : res.orderStatus === 5 ? 'Cancelled' : res.orderStatus === 6  ? 'Returned': res.orderStatus === 7 ? 'exchanged':'In processing'
        // if (res.isOrdered === true && res.isPacked === null) {
        //   status = "Ordered"
        // }
        // else if (
        //   res.isOrdered === true &&
        //   item.isPacked === true &&
        //   item.isShipped === null
        // ) {
        //   status = "Packed";
        // }
        // else if (
        //   item.isOrdered === true &&
        //   item.isPacked === true &&
        //   item.isShipped === true &&
        //   item.isDelivered === null
        // ) {
        //   status = "Shipped"
        // }
        // else if (
        //   item.isOrdered === true &&
        //   item.isPacked === true &&
        //   item.isShipped === true &&
        //   item.isDelivered === true
        // ) {
        //   status = "Delivered"
        // }
        // else if (item.isCancelled === true) {
        //   status = "Cancelled"
        // }
        // else {
        //   status = "Pending"
        // }
        return { status, ...res };
      }
    ))

  }

  productDiscount(quantity, totalPrice, discountType, discountValue) {
    let total = Number(totalPrice) * Number(quantity)
    if (discountType.toLowerCase() === 'percentage') {
      let discount = ((Number(totalPrice) * Number(quantity) / 100) * Number(discountValue))
      return {
        discount: discount,
        total: Number(total) - Number(discount)
      }
    }
    else {
      return {
        discount: Number(discountValue) * Number(quantity),
        total: Number(total) - (Number(discountValue) * Number(quantity))
      }
    }
  }
  invoiceGeneration(orderId) {
    var data = document.getElementById(orderId);
    html2canvas(data).then(canvas => { 
      var imgWidth = 208;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      var imgHeight = 0;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Invoice_' + orderId + '.pdf'); // Generated PDF   
    });
  }

  scrollDiv(orderId) {
    let el = document.getElementById(orderId);
    el.scrollIntoView({ behavior: "smooth" });
  }
  exchangeOrderId: any
  exchangeProductId: any
  exchangeVariantId: any
  exchangeProduct(orderId, productId, variantId) {
    $("#exchangeModal").modal('show');
    this.exchangeOrderId = orderId
    this.exchangeProductId = productId,
      this.exchangeVariantId = variantId;
  }

  refundOrderId: any
  refundProductId: any
  refundVariantId: any
  refundProduct(orderId, productId, variantId) {
    $("#refundModal").modal('show');
    this.refundOrderId = orderId
    this.refundProductId = productId,
      this.refundVariantId = variantId
  }

  onSelectExchange(event) {
    // this.exchangeFiles = [];
    this.exchangeFiles.push(...event.addedFiles);
    this.exchangeFormGroup.patchValue({ productImage: this.exchangeFiles });
  }

  onRemoveExchange(event) {
    this.exchangeFiles.splice(this.exchangeFiles.indexOf(event), 1);
    this.exchangeFormGroup.patchValue({ productImage: this.exchangeFiles });
  }
  onSelectExchangeVideo(event) {
    // this.exchangeFiles = [];
    this.exchangeFilesVideo.push(...event.addedFiles);
    this.exchangeFormGroup.patchValue({ productVideo: this.exchangeFilesVideo });
  }

  onRemoveExchangeVideo(event) {
    this.exchangeFilesVideo.splice(this.exchangeFilesVideo.indexOf(event), 1);
    this.exchangeFormGroup.patchValue({ productVideo: this.exchangeFilesVideo });
  }

  onSelectRefund(event) {
    // this.refundFiles = [];
    this.refundFiles.push(...event.addedFiles);
    this.refundFormGroup.patchValue({ productImage: this.refundFiles });
  }

  onRemoveRefund(event) {
    this.refundFiles.splice(this.refundFiles.indexOf(event), 1);
    this.refundFormGroup.patchValue({ productImage: this.refundFiles });
  }
  onSelectRefundVideo(event) {
    // this.refundFiles = [];
    this.refundFilesVideo.push(...event.addedFiles);
    this.refundFormGroup.patchValue({ productVideo: this.refundFilesVideo });
  }

  onRemoveRefundVideo(event) {
    this.refundFilesVideo.splice(this.refundFilesVideo.indexOf(event), 1);
    this.refundFormGroup.patchValue({ productVideo: this.refundFilesVideo });
  }
  selectExchangeReason(list) {
      this.selectedExchangeString=list.name
      this.exchangeReason.map((i,m)=>{
        $("#exchange" + i.id).removeClass("selectedBoxDiv")
      })
      $("#exchange" + list.id).addClass("selectedBoxDiv")
    
    // let find = this.selectedExchangeReason.findIndex(t => t.id === list.id)
    // if (find === -1) {
    //   this.selectedExchangeReason.push({
    //     id: list.id,
    //     name: list.name
    //   })
    //   $("#exchange" + list.id).addClass("selectedBoxDiv")
    // }
    // else {
    //   this.selectedExchangeReason.splice(find, 1)
    //   $("#exchange" + list.id).removeClass("selectedBoxDiv")
    // }
  }

  selectRefundReason(list) {
    this.selectedRefundString=list.name
    this.refundReason.map((i,m)=>{
      $("#refund" + i.id).removeClass("selectedBoxDiv")
    })
    $("#refund" + list.id).addClass("selectedBoxDiv")
    // let find = this.selectedRefundReason.findIndex(t => t.id === list.id)
    // if (find === -1) {
    //   this.selectedRefundReason.push({
    //     id: list.id,
    //     name: list.name
    //   })
    //   $("#refund" + list.id).addClass("selectedBoxDiv")
    // }
    // else {
    //   this.selectedRefundReason.splice(find, 1)
    //   $("#refund" + list.id).removeClass("selectedBoxDiv")
    // }
  }

  exchange() {
    if (this.exchangeFormGroup.value.comment && this.selectedExchangeString && this.exchangeFiles.length>=3) {
      const formData = new FormData();
      formData.append("orderId", this.exchangeOrderId);
      formData.append("productId", this.exchangeProductId);
      formData.append("variantId", this.exchangeVariantId);
      formData.append("reason", this.selectedExchangeString);
      formData.append("comment", this.exchangeFormGroup.value.comment);
      for (var i = 0; i < this.exchangeFiles.length; i++) {
        if(i==0){
          formData.append("productImage", this.exchangeFiles[i]);
        }else  if(i==1){
          formData.append("productImage2", this.exchangeFiles[i]);
        }else if(i==2){
          formData.append("productImage3", this.exchangeFiles[i]);
        }
      }
      for (var i = 0; i < this.exchangeFilesVideo.length; i++) {
        formData.append("productVideo", this.exchangeFilesVideo[i]);
      }
      this._PFS.exchange(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            $("#exchangeModal").modal('hide');
            this.exchangeFormGroup.reset()
            this.exchangeFiles = []
            this.exchangeFilesVideo = []
            this.selectedExchangeReason = []
            this.exchangeReason.map((_)=>{
              $("#exchange" + _.id).removeClass("selectedBoxDiv")
            })
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
            this.getOrderDetails();
          } else {
            $("#exchangeModal").modal('hide');
            this.exchangeReason.map((_)=>{
              $("#exchange" + _.id).removeClass("selectedBoxDiv")
            })
            this.exchangeFormGroup.reset()
            this.exchangeFiles = []
            this.exchangeFilesVideo = []
            this.selectedExchangeReason = []
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        })
    } else {
      let message=''
      if(this.exchangeFiles.length<3){
        message="Please Select minimum three images"
      }
      else{
        message="Please Fill all fields"
      }
     // this.alertMessage({ type: "danger", title: "Error Occured", value: message });
    }
  }

  refund() {
    if (this.refundFormGroup.value.comment && this.selectedRefundString && this.refundFiles.length>=3) {
      const formData = new FormData();
      formData.append("orderId", this.refundOrderId);
      formData.append("productId", this.refundProductId);
      formData.append("variantId", this.refundVariantId);
      formData.append("reason", this.selectedRefundString);
      formData.append("comment", this.refundFormGroup.value.comment);
      for (var i = 0; i < this.refundFiles.length; i++) {
        if(i==0){
          formData.append("productImage", this.refundFiles[i]);
        }else  if(i==1){
          formData.append("productImage2", this.refundFiles[i]);
        }else if(i==2){
          formData.append("productImage3", this.refundFiles[i]);
        }
      }
      for (var i = 0; i < this.refundFilesVideo.length; i++) {
        formData.append("productVideo", this.refundFilesVideo[i]);
      }
      this._PFS.refund(formData).subscribe(
        (data: any) => {
          if (data.meta.status) {
            $("#refundModal").modal('hide');
            this.refundReason.map((_)=>{
              $("#refund" + _.id).removeClass("selectedBoxDiv")
            })
            this.refundFormGroup.reset()
            this.refundFiles = []
            this.refundFilesVideo = []
            this.selectedRefundReason = []
            //this.alertMessage({ type: "success", title: "Success", value: data.meta.msg });
            this.getOrderDetails();
          } else {
            $("#refundModal").modal('hide');
            this.refundReason.map((_)=>{
              $("#refund" + _.id).removeClass("selectedBoxDiv")
            })
            this.refundFormGroup.reset()
            this.refundFiles = []
            this.refundFilesVideo = []
            this.selectedRefundReason = []
            //this.alertMessage({ type: "danger", title: "Error Occured", value: data.meta.msg });
          }
        })
    } else {
      let message=''
      if(this.refundFiles.length<3){
        message="Please Select minimum three images"
      }
      else{
        message="Please Fill all fields"
      }
    //  this.alertMessage({ type: "danger", title: "Error Occured", value:message });
    }
  }

}
