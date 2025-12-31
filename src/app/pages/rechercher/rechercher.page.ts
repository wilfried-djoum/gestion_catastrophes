import { CartePage } from './../carte/carte.page';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoadingController, ModalController } from '@ionic/angular';
import { Catastrophes } from '../accueil/catastrophes.model';
import { DetailsPage } from '../details/details.page';
import * as L from 'leaflet';
import { Map, tileLayer, marker } from 'leaflet';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.page.html',
  styleUrls: ['./rechercher.page.scss'],
})
export class RechercherPage implements OnInit {
  segId = "catastrophes";
  searchTerms: string;
  posts: any[] = [];
  // @Input() catastrophe: Catastrophes
  constructor(private router: Router, private http: HttpClient, private loadingCtrl: LoadingController, private modalCtrl: ModalController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Chargement...', mode: 'ios',
      translucent: true
    });
    loading.present();
    this.loadCatastrophes()
    loading.dismiss()

  }



  loadCatastrophes() {
    const API_URI = `${environment.API_URL}catastrophes/`
    this.http.get(API_URI).subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts)

    });

  }

  async openDetailModal(catastrophe: Catastrophes) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { catastrophe }
    });
    modal.present()
  }
  onSearchChange(e) {

  }

  segmentChanged(ev) {
    this.segId = ev.detail.value;
  }

  detailPage() {
    this.router.navigate(['details'])
  }
  async modalMap() {
    const modal = await this.modalCtrl.create({
      component: CartePage,
      // componentProps: { carte }
    });
    modal.present()
  }

}
