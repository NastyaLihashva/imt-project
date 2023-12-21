import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Api {
  private url = 'https://randomuser.me/api/';
  private userData: any;

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    if (this.userData) {
      return this.userData;
    } else {
      return this.http.get<any>(`${this.url}`);
    }
  }
  saveUserData(data: any) {
    this.userData = data;
  }

}
