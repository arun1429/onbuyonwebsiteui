import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationData: any
  currentPageNumber: 1;
  constructor(private _USP: ProfileService) { }

  ngOnInit(): void {

    this.getNotifications();
    
  }

  getNotifications() {
    this._USP.getNotifications().subscribe((data: any) => {
      if (data.meta.status) {
        this.notificationData = data.data;
      }
    })
  }
}
