import { AuthentificationService } from 'src/app/services/authentification.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  static accesToken = '';
  constructor( private injector: Injector) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem("currentUser");
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Header" + idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req)
    }

    // const req = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${TokenInterceptor.accesToken}`
    //   }
    // })
    // return next.handle(req)
  }

  // intercept(req, next){
  //   let authentificationService = this.injector.get(AuthentificationService)
  //   let tokenizedReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authentificationService.getToken()}`
  //     }
  //   })
  //   return next.handle(tokenizedReq)
  // }
}
