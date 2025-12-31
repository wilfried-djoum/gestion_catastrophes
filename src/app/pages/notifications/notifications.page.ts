import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
  }
  async deleteNote() {
    const toast = await this.toastCtrl.create({
      message: "Elément éffacé !",
      duration: 1000,
      position: "top",
      color: "light",
      buttons: [
        {
          icon: "close",
          role: 'cancel'
        }
      ]
    });
    toast.present()
  }
}
