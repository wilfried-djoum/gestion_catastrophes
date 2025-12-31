import { HttpClient } from '@angular/common/http';
import { CatastrophesService } from './../../services/catastrophes.service';
import { Router } from '@angular/router';
import { LoadingController, PopoverController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Catastrophes } from './catastrophes.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetailsPage } from '../details/details.page';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  posts: any[] = [];
  postSort: any[] = [];
  postUser: any[] = [];
  postNaturelle: any[] = [];
  postHomme: any[] = []
  CauseHomme2;

  constructor(private loadingCtrl: LoadingController, private router: Router, public popoverController: PopoverController, private catastropheService: CatastrophesService, private http: HttpClient, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.loadCatastrophes()
  }


  //Charger les catastrophes de la base de données
  async loadCatastrophes() {
    const API_URI = `${environment.API_URL}catastrophes/`
    this.http.get(API_URI).subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement....', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.posts = data;
      loading.dismiss()
      // console.log(this.posts)

      //post hommes
      for (const CauseHomme of this.posts) {
        const CauseHomme1 = JSON.stringify(CauseHomme)
        const CauseHomme2 = JSON.parse(CauseHomme1)
        if (CauseHomme2.categorie.nom == "Causée par l'homme") {
          this.postHomme.push(CauseHomme2);
        }
      }

      //post naturel
      for (const CauseHomme of this.posts) {
        const CauseHomme1 = JSON.stringify(CauseHomme)
        const CauseHomme2 = JSON.parse(CauseHomme1)
        if (CauseHomme2.categorie.nom == "Naturelle") {
          this.postNaturelle.push(CauseHomme2);
        }
      }
    });
  }

  //Ouvrir le modal des details des catastrophes
  async openDetailModal(catastrophe: Catastrophes) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: { catastrophe }
    });
    modal.present()
  }
}

