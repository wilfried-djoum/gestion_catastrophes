import { SolutionService } from './../../services/solution.service';
import { Catastrophes } from './../accueil/catastrophes.model';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { SolutionsPage } from '../solutions/solutions.page';
import * as L from 'leaflet';
import { Map, tileLayer, marker } from 'leaflet';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  map: Map;
  // latLong = [];
  @Input() catastrophe: Catastrophes
  inToken: any;
  payloadParse: any
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  postedMessages: any[] = []
  postedMessageSeul = []
  postedMessageSeulId = []

  constructor(private router: Router, private loadingCtrl: LoadingController, private modalcrtl: ModalController, private modalCtrl: ModalController, private jwtHelper: JwtHelperService, private solutionService: SolutionService) { }

  async ngOnInit() {
    console.log(this.catastrophe.id);

    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Chargement....', mode: 'ios',
      translucent: true
    });
    loading.present();
    this.getSolution()
    if (loading.spinner) {
      loading.dismiss()
    }
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
      // for(const id of this.postedMessages){
      //   if (id.id == this.catastrophe.id) {
      //     console.log("voici le id bro : " + id.id);
      //     this.postedMessageSeulId = id
      //     console.log("new tableau bebe : " + this.postedMessageSeulId);

      //   } else {

      //   }
      // }

      // for(const id of this.postedMessages){
      //   if (id.id == this.catastrophe.id) {
      //     this.postedMessageSeul.push(this.postedMessages[this.postedMessages.length-1])
      //   }else{
      //     return this.postedMessageSeul
      //   }
      // }

      // console.log(this.postedMessages);
      // console.log(this.postedMessageSeul);
      loading.dismiss()
    })
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
      .bindPopup('<b>' + this.catastrophe.nomCatastrophe + '</b> <br>' + this.catastrophe.createdAt, {
        closeButton: true
      })
      L.circle([this.catastrophe.latitude, this.catastrophe.longitude], {
        color: 'red',
        radius: this.catastrophe.dimension,
        fillcolor: 'red',
        opacity: .5
      }).addTo(this.map)
      .openPopup();
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  async commentsPage() {
    const modal = await this.modalcrtl.create({
      component: SolutionsPage,
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      cssClass: 'solutionModal'
    });
    return await modal.present();
  }
  detailPage() {
    this.router.navigate(['detail'])
  }
}
