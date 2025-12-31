import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const API_URI = `${environment.API_URL}`
@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAstr = localStorage.getItem('currentUser');
    if (storageUserAstr) {
      storageUser = JSON.parse(storageUserAstr);
    }
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
    // const token = localStorage.getItem('utilisateur');
    // this._isLoggedIn$.next(!!token)
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(user: User): Observable<any> {
    return this.http.post<any>(API_URI + 'login_check', user).pipe(

      map((response: User) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
      // tap((response: any)=>{
      //   this._isLoggedIn$.next(true);
      //   localStorage.setItem('utilisateur', response.token)

      // })
    );

  }

  getToken() {
    return localStorage.getItem('token')
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URI + 'users', user);
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }


}
