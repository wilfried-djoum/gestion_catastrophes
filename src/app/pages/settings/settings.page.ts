import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ManuelPage } from '../option/manuel/manuel.page';
import { ContactPage } from '../option/contact/contact.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private modalCtrl: ModalController, private authentificationService: AuthentificationService, private loadinCtrl: LoadingController, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async openDetailModal() {
    const modal = await this.modalCtrl.create({
      component: ManuelPage,
    });
    modal.present()
  }

  async logOut() {
    const load = await this.loadinCtrl.create({
      spinner: 'lines',
      message: 'Déconnexion en cours...', mode: 'ios',
      translucent: true
    })
    load.present()
    this.authentificationService.logout()
    load.dismiss()
    this.router.navigate(['login'])
    const toast = await this.toastCtrl.create({
      message: 'déconnecté! ..',
      position: 'top',
      duration: 1000,
      color: 'light'
    })
    toast.present()
  }

  async contactModal() {
    const modal = await this.modalCtrl.create({
      component: ContactPage
    });
    modal.present()
  }
  aboutPage() {
    this.router.navigate(['about'])
  }

}
