import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  inToken: any;
  payloadParse:any
  tokenPayload: any;
  expirationDate: any;
  currentUser: User = new User();
  userdatas: any;
  item: any
  countryCode: string='237'
  whatsappNumber:string='694499123'
  url: string="https://wa.me/"+this.countryCode+this.whatsappNumber+"?text=Salut, j'aimerai avoir certaines informations!";

  constructor(private modalCtrl: ModalController, private jwtHelper :JwtHelperService) { }

  ngOnInit() {
    this.getLocalStorageUserData()
  }

  closeModal(){
    this.modalCtrl.dismiss()
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
    console.log( this.tokenPayload);
    this.payloadParse = JSON.parse(this.tokenPayload);
    // console.log(this.payloadParse.username);
    this.payloadParse = this.payloadParse.username;



    return this.inToken;

  }
}
