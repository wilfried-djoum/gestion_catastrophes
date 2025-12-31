import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { TokenInterceptor } from 'src/app/services/tokenInterceptor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  errorMessage: string = "";
  constructor(private authenticationService: AuthentificationService, private router: Router, private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  connect = {
    email: "",
    password: "",
  }
  type: boolean = true;

  changeType() {
    this.type = !this.type;
  }
  onnexion() {
    this.router.navigate(['home'])
    // console.log(this.connect)
  }
  registerPage() {
    this.router.navigate(['register'])
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/app-profile']);

    }

  }
  async login() {
    const load = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Connexion ...', mode: 'ios',
      translucent: true
    })
    load.present();
    this.authenticationService.login(this.user).subscribe(async (data: any) => {
      let toast = await this.toastCtrl.create({
        message: 'Vous êtes connecté(e) !',
        duration: 2000,
        color: "light",
        position: "top",
        buttons: [
          {
            role: "cancel",
            icon: "close"
          }
        ]
      })
      load.dismiss()
      toast.present()
      TokenInterceptor.accesToken = data.token;
      this.router.navigate(['home'])
    }, err => {
      this.errorMessage = 'email incorrect';
      console.log(err);
    })
  }


  forgotPassword() {

  }
}
