import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth'; // URL do backend Nest.js

  constructor(private http: HttpClient) {}

  login(): void {
    window.location.href = `${this.authUrl}/login`;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  }

//   getTokenFromQueryParams(queryParams: any): Observable<any> {
//     const params = new HttpParams({ fromObject: queryParams });
//     return this.http.get(`${this.authUrl}/callback`, { params });
//   }
}
