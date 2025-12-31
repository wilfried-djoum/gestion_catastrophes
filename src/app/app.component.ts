import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { User } from './models/user.model';
import { Roles } from './models/roles.model';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUser: User = new User();
  constructor(private authenticationService: AuthentificationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser= data;
   });
  }

  isUser(){
    return this.currentUser?.roles===Roles.ROLE_USER;
 }
 logout(){
   this.authenticationService.logout();
   this.router.navigate(['app-logins']);
 }
}
