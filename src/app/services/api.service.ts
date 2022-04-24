import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//const API_SERVER = 'http://127.0.0.1:3000';
const API_SERVER = 'https://iqbalrahman-api.myprism.biz';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public createNewUserEvent: EventEmitter<any> = new EventEmitter();
  public editUserEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient,) { }

  createUser(data: any): Observable<any> {
    return this.http.post(`${API_SERVER}/`, { ...data });
  }

  getUser(): Observable<any> {
    return this.http.get(API_SERVER).pipe(map(res => res));
  }

  deleteUser(item: any): Observable<any> {
    return this.http.delete(`${API_SERVER}/${item}`);
  }

  updateUser(data: any, id: any): Observable<any> {
    return this.http.put(`${API_SERVER}/${id}`, { ...data });
  }
}


