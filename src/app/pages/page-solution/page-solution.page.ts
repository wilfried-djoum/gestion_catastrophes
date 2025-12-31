import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Solution } from 'src/app/models/solution.model';
import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { SolutionService } from 'src/app/services/solution.service';
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-page-solution',
  templateUrl: './page-solution.page.html',
  styleUrls: ['./page-solution.page.scss'],
})
export class PageSolutionPage implements OnInit {
  inToken: any;
  payloadParse: any
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  username;
  posts: any[] = []
  postPerso: any[] = []
  @Input() solution: Solution

  constructor(private jwtHelper: JwtHelperService, private loadingCtrl: LoadingController, private solutionService: SolutionService, private router: Router) { }

  ngOnInit() {
    this.getLocalStorageUserData()
    this.loadSolutions()
  }

  async loadSolutions() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Chargement....',
      mode: 'ios',
      translucent: true
    });
    loading.present();
    this.solutionService.getAllSolution().subscribe(solution => {
      this.posts = solution;
      console.log(this.posts);
      this.postPerso = this.posts.filter((el) => { return el.username == this.payloadParse })
      console.log(this.postPerso);

      loading.dismiss()
    })

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

  async deleteSolution(id:any) {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Suppression...',
      mode: 'ios',
      translucent: true
    });
    loading.present();
    this.solutionService.deleteSolution(id).pipe(
      take(1)
    ).subscribe(() => {
      loading.dismiss()
      this.router.navigate(['home'])
      // this.closeModal('supprimer')
    })
  }
}
