import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.messageService.add({ severity: 'warn', summary: 'Hata', detail: 'Oturum süresi doldu. Tekrar giriş yapın!' })
            this.router.navigate(['admin', 'login'])
          }
          else if (err.status === 0) {
            localStorage.removeItem("token")
            this.router.navigate(['admin', 'login'])
            return throwError(() => new Error("Sunucu hatası!"));
          }
        }
        return throwError(() => new Error("Saçma sapan bi hata oluştu!" + err.message));
      })
    )
  }
}
