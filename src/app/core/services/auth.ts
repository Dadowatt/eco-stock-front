import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../config/api.config';
import { AuthResponse } from '../models/auth-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
    private http = inject(HttpClient);
    login(username:string, password:string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
        API.TOKEN,
        {
            username,
            password
        }
        );
    }
}
