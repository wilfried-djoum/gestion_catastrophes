import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catastrophes } from '../pages/accueil/catastrophes.model';


@Injectable({
  providedIn: 'root'
})
export class CatastrophesService {
   API_URI = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  getAllCatastrophes(): Observable<Catastrophes[]> {
    return this.http.get<Catastrophes[]>(`${this.API_URI}catastrophes/`)
  }

  addCatastrophes(catastrophe: any): Observable<Catastrophes>{
    return this.http.post<Catastrophes>(`${this.API_URI}catastrophes`, catastrophe)
  }

  updateCatastrophes(id : number, catastrophe: Catastrophes): Observable<Catastrophes>{
    return this.http.put<Catastrophes>(`${this.API_URI}catastrophes/${id}`, catastrophe);
  }

  deleteCatastrophes(id : number): Observable<Catastrophes>{
    return this.http.delete<Catastrophes>(`${this.API_URI}catastrophes/${id}`);
  }

}
