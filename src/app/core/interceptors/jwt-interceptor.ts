import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/auth';
import { API } from '../config/api.config';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(Auth);

  const token = auth.getAccessToken();

  const isAuthRequest =
    req.url === API.TOKEN ||
    req.url === API.REFRESH;

  if (!token || isAuthRequest) {
    return next(req);
  }

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authRequest);

};