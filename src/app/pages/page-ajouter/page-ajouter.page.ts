import { JwtHelperService } from '@auth0/angular-jwt';
import { map, take, tap } from 'rxjs/operators';
import { LoadingController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Catastrophes } from '../accueil/catastrophes.model';
import { DetailsPage } from '../details/details.page';
import { AjouterPage } from '../ajouter/ajouter.page';
import { Observable } from 'rxjs';
import { CatastrophesService } from 'src/app/services/catastrophes.service';
import { UserCatastrophePage } from '../user-catastrophe/user-catastrophe.page';

@Component({
  selector: 'app-page-ajouter',
  templateUrl: './page-ajouter.page.html',
  styleUrls: ['./page-ajouter.page.scss'],
})
export class PageAjouterPage implements OnInit {
  inToken: any;
  payloadParse: any
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  username;
  count: any;
  // @Input() catastrophes: Catastrophes
  postKnow: any[] = [];
  postPerso: any[] = []
  posts: Observable<Catastrophes[]>
  constructor(private http: HttpClient, private loadingCtrl: LoadingController, private modalCtrl: ModalController, private catastrophesService: CatastrophesService, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.getLocalStorageUserData()
    // this.personalPosts()
    this.loadCatastrophes();
  }

  // closeModal(role = 'edit') {
  //   this.modalCtrl.dismiss(this.catastrophes, role)
  // }

  async loadCatastrophes() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Chargement....', mode: 'ios',
      translucent: true
    });
    loading.present();
    this.posts = this.catastrophesService.getAllCatastrophes().pipe(
      tap(catastrophe => {
        loading.dismiss()
        return catastrophe
      })
    )

  }
  async openDetailModal(catastrophe: Catastrophes) {
    const modal = await this.modalCtrl.create({
      component: UserCatastrophePage,
      componentProps: { catastrophe }
    });
    await modal.present()
    const { data: misAJour, role } = await modal.onDidDismiss();
    if (misAJour && role == 'editer') {
      this.posts = this.posts.pipe(
        map((catastrophe) => {
          catastrophe.forEach((cat) => {
            if (cat.id == misAJour.id) {
              cat = misAJour
            }
            return cat
          });
          return catastrophe
        })
      )
    }

    if (role == 'supprimer') {
      this.posts = this.posts.pipe(
        map((catastrophe) => {
          catastrophe.filter((cat) => {
            cat.id != misAJour.id
            return cat
          });
          return catastrophe
        })
      )
    }
  }

  GetTokenDecoded() {
    // console.log(this.jwtHelper.decodeToken(this.inToken))
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
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
    this.payloadParse = JSON.parse(this.tokenPayload);
    this.payloadParse = this.payloadParse.username;
    // console.log(this.payloadParse);
  }
}
