import { CatastrophesService } from 'src/app/services/catastrophes.service';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SolutionService } from './../../services/solution.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, LoadingController, ModalController } from '@ionic/angular';
import { Catastrophes } from '../accueil/catastrophes.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Solution } from 'src/app/models/solution.model';


@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.page.html',
  styleUrls: ['./solutions.page.scss'],
})
export class SolutionsPage implements OnInit {

  currentUser = "will";
  newMsg = '';
  inToken: any;
  username: any;
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  postedMessages: any[] = []
  posts: any[] = [];

  @ViewChild(IonContent) content: IonContent
  @Input() catastrophe: Catastrophes
  @Input() solution: Solution
  form: FormGroup


  constructor(private loadingCtrl: LoadingController, private http: HttpClient, private solutionService: SolutionService, private jwtHelper: JwtHelperService, private catastrophesService: CatastrophesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.userdatas);
    this.getCatastrophes()
    this.getLocalStorageUserData()
    this.getSolution()
    this.initSolution()
  }
  initSolution() {
    this.form = new FormGroup({
      nomCatastrophe: new FormControl(null, [Validators.required]),
      username: new FormControl(this.username, [Validators.required]),
      message: new FormControl(null, [Validators.required, Validators.minLength(15)]),
    })
  }

  async postSolution() {
    const loading = await this.loadingCtrl.create({
      spinner: 'dots', message: 'Enregistrement en cours....', mode: 'ios',
      translucent: true
    });
    loading.present();
    let response: Observable<Solution>;
    response = this.solutionService.addSolution(this.form.value)
    response.pipe(
      take(1)
    ).subscribe(solution => {
      this.modalCtrl.dismiss()
      this.form.reset()
      console.log(solution);
    })
    loading.dismiss()

    setTimeout(() => {
      this.content.scrollToBottom(200);
    })
  }

  async getCatastrophes() {
    this.catastrophesService.getAllCatastrophes().subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement...', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.posts = data;
      console.log(this.posts);
      loading.dismiss()
    })
  }


  async getSolution() {
    this.solutionService.getAllSolution().subscribe(async (data: any) => {
      const loading = await this.loadingCtrl.create({
        spinner: 'lines', message: 'Chargement...', mode: 'ios',
        translucent: true
      });
      loading.present();
      this.postedMessages = data;
      console.log(this.postedMessages);
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
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
    this.username = JSON.parse(this.tokenPayload);
    this.username = this.username.username;
    console.log(this.username);
  }

}
