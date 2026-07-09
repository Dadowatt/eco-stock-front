import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../config/api.config';
import { AuthResponse } from '../models/auth-response';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    private http = inject(HttpClient);
    login(username: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(
            API.TOKEN,
            {
                username,
                password
            }
        )

            .pipe(

                tap(response => {

                    localStorage.setItem(
                        'access_token',
                        response.access
                    );

                    localStorage.setItem(
                        'refresh_token',
                        response.refresh
                    );

                })

            );
    }

    getAccessToken(): string | null {

        return localStorage.getItem('access_token');
    }

    isAuthenticated(): boolean {

        return this.getAccessToken() !== null;
    }

    logout(): void {

        localStorage.removeItem('access_token');

        localStorage.removeItem('refresh_token');

    }
}
