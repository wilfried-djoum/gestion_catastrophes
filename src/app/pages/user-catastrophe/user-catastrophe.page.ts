import { SolutionService } from './../../services/solution.service';
import { take } from 'rxjs/operators';
import { CatastrophesService } from 'src/app/services/catastrophes.service';
import { AjouterPage } from './../ajouter/ajouter.page';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Catastrophes } from '../accueil/catastrophes.model';
import { SolutionsPage } from '../solutions/solutions.page';
import * as L from 'leaflet';
import { Map, tileLayer, marker } from 'leaflet';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-catastrophe',
  templateUrl: './user-catastrophe.page.html',
  styleUrls: ['./user-catastrophe.page.scss'],
})
export class UserCatastrophePage implements OnInit {
  map: Map;
  inToken: any;
  payloadParse: any
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  postedMessages: any[] = []
  postedMessageSeul = []
  postedMessageSeulId = []
  @Input() catastrophe: Catastrophes

  constructor(private jwtHelper: JwtHelperService, private modalCtrl: ModalController, private catastropheService: CatastrophesService, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private solutionService: SolutionService) { }

  ngOnInit() {
    this.getSolution()
    this.getLocalStorageUserData()
  }

  async getSolution() {
    this.solutionService.getAllSolution().subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement...', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.postedMessages = data;
      this.postedMessageSeul = this.postedMessages.filter((el) => { return el.nomCatastrophe == this.catastrophe.nomCatastrophe });
      this.postedMessageSeulId.push(this.postedMessageSeul[this.postedMessageSeul.length - 1])
      loading.dismiss()
    })
  }

  closeModal(role = 'editer') {
    this.modalCtrl.dismiss(this.catastrophe, role);
  }
  GetTokenDecoded() {
    console.log(this.jwtHelper.decodeToken(this.inToken))
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
  }
  getTokenExpirationDate() {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.inToken);
  }

  getLocalStorageUserData() {
    this.item = localStorage.getItem('currentUser');
    if (this.item != null) {
      this.userdatas = JSON.parse(this.item);
    }
    this.inToken = this.userdatas.token
    console.log(this.inToken);
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
    // console.log( this.tokenPayload);
    this.payloadParse = JSON.parse(this.tokenPayload);
    // console.log(this.payloadParse.username);
    this.payloadParse = this.payloadParse.username;
    return this.inToken;
  }

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([this.catastrophe.latitude, this.catastrophe.longitude], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker([this.catastrophe.latitude, this.catastrophe.longitude]).addTo(this.map)
      .bindPopup('<b>' + this.catastrophe.nomCatastrophe + '</b> <br>' + this.catastrophe.createdAt)
      .openPopup();
  }
  async commentsPage() {
    const modal = await this.modalCtrl.create({
      component: SolutionsPage,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      cssClass: 'solutionModal'
    });
    return await modal.present();
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: AjouterPage,
      componentProps: { catastrophe: this.catastrophe }
    });
    await modal.present();
    const { data: misAJour } = await modal.onDidDismiss();
    if (misAJour) {
      this.catastrophe = misAJour;
    }
  }

  async onDeleteCatastrophe() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Suppression...', mode: 'ios',
      translucent: true
    });
    loading.present();
    this.catastropheService.deleteCatastrophes(this.catastrophe.id).pipe(
      take(1)
    ).subscribe(() => {
      loading.dismiss()
      this.closeModal('supprimer')
    })
  }
}
