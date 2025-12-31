import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthentificationService } from './services/authentification.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutosizeModule } from 'ngx-autosize';
import { TokenInterceptor } from './services/tokenInterceptor.service';
import { JwtHelperService , JWT_OPTIONS} from '@auth0/angular-jwt';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [Geolocation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthentificationService, AutosizeModule,
    {
      // provide: HTTP_INTERCEPTORS,
      // useClass: TokenInterceptor,
      // multi: true,
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    }, JwtHelperService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
