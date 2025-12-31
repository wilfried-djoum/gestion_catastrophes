import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  errorMessage: string = "";

  type: boolean = true;
  constructor(private loadingCtrl: LoadingController, private router: Router, private toastCtrl: ToastController, private authenticationService: AuthentificationService) { }
  connect = {
    username: "",
    // nom: "",
    // prenom: "",
    email: "",
    password: "",
    phone: "",
    image: '',
  }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/app-profile']);
    }
  }
  async register() {
    const load = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'En cours ...', mode: 'ios',
      translucent: true
    })
    load.present()
    this.authenticationService.register(this.user).subscribe(async (data: any) => {
      let toast = await this.toastCtrl.create({
        message: 'Compte enregisté !',
        duration: 3000,
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
      this.router.navigate(['login'])
      console.log(data);

    }, (err: any) => {
      if (err?.status === 409) {
        this.errorMessage = 'le usename n existe pas !';
      } else {
        this.errorMessage = 'type inconnu' + err?.errorMessage;
        console.log(err);
      }
    })
    console.log(this.register);

  }

  changeType() {
    this.type = !this.type
  }

  async login() {
    let toast = await this.toastCtrl.create({
      message: 'Compte enregisté !',
      duration: 3000,
      color: "light",
      position: "top",
      buttons: [
        {
          role: "cancel",
          icon: "close"
        }
      ]
    })
    toast.present()
    this.router.navigate(['login'])
    console.log(this.connect)
  }


}
