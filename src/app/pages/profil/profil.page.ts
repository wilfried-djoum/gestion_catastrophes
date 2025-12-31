import { AuthentificationService } from './../../services/authentification.service';
import { ActionSheetController, IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsPage } from '../notifications/notifications.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Roles } from 'src/app/models/roles.model';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  inToken: any;
  payloadParse: any
  tokenPayload: any;
  expirationDate: any;
  currentUser: User = new User();
  userdatas: any;
  item: any
  count: any;
  countSolution: any;
  postKnow: any[] = [];
  postPerso: any[] = [];
  postSolutions: any[] = [];
  postSolutionPerso: any[] = [];

  constructor(private loadingCtrl: LoadingController, private router: Router, public routerOutlet: IonRouterOutlet, private http: HttpClient,
    private actionSheetCtrl: ActionSheetController, private modalcrtl: ModalController, private authenticationService: AuthentificationService, private jwtHelper: JwtHelperService) {
    // this.authenticationService.currentUser.subscribe(data => {
    //   this.currentUser = data;
    // });

    // this.inToken;

    // this.GetTokenDecoded();
    // this.getTokenExpirationDate();
  }
  isUser() {
    return this.currentUser?.roles === Roles.ROLE_USER;
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Chargement....', mode: 'ios',
      translucent: true
    });
    loading.present();
    this.personalPosts();
    this.personalSolution();
    this.getLocalStorageUserData()
    if (loading.spinner) {
      loading.dismiss()
    }

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
    // console.log(this.inToken);
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
    // console.log( this.tokenPayload);
    this.payloadParse = JSON.parse(this.tokenPayload);
    // console.log(this.payloadParse.username);
    this.payloadParse = this.payloadParse.username;



    return this.inToken;

  }

  update_info_page() {
    this.router.navigate(['update-infos'])
  }

  settingsPage() {
    this.router.navigate(['settings'])
  }
  async showmodal() {
    const modal = await this.modalcrtl.create({
      component: NotificationsPage,
      initialBreakpoint: 0.8,
      breakpoints: [0, 0.8],
      cssClass: 'notificationModal'
    });
    return await modal.present();
  }

  async personalPosts() {
    const API_URI = `${environment.API_URL}catastrophes/`
    this.http.get(API_URI).subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement....', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.postKnow = data;
      // console.log(this.posts)

      //post perso
      this.count = 0
      for (const causeHomme of this.postKnow) {
        if (causeHomme.username == this.payloadParse) {
          this.postPerso.push(causeHomme)
        }
      }
      // console.log(this.postPerso);
      for (let i = 0; i < this.postPerso.length; i++) {
        this.count = i + 1

      }
      loading.dismiss()
      // console.log(this.count);
      return this.postPerso
    });
  }

  async personalSolution() {
    const API_URI = `${environment.API_URL}solutions/`
    this.http.get(API_URI).subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement....', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.postSolutions = data;
      // console.log(this.posts)

      //post perso
      this.countSolution = 0
      for (const causeHomme of this.postSolutions) {
        if (causeHomme.username == this.payloadParse) {
          this.postSolutionPerso.push(causeHomme)
        }
      }
      // console.log(this.postPerso);
      for (let i = 0; i < this.postSolutionPerso.length; i++) {
        this.countSolution = i + 1

      }
      loading.dismiss()
      // console.log(this.countSolution);
      return this.postSolutionPerso
    });
  }


  navigatePrivatePage() {
    this.router.navigate(['page-ajouter'])
  }
  navigatePrivatePageSolution() {
    this.router.navigate(['page-solution'])
  }
}
