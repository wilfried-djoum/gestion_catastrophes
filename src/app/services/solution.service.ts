import { Solution } from './../models/solution.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  API_URI = `${environment.API_URL}`

  constructor(private http: HttpClient) { }

  getAllSolution(): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${this.API_URI}solutions/`)
  }

  addSolution(solution : Solution): Observable<Solution> {
    return this.http.post<Solution>(`${this.API_URI}solutions`, solution)
  }

  deleteSolution(id : number): Observable<Solution>{
    return this.http.delete<Solution>(`${this.API_URI}solutions/${id}`);
  }

}
