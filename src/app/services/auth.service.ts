import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api'
import { JwtHelperService } from '@auth0/angular-jwt'

import { ApiService } from './api.service';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;

  constructor(private api: ApiService, private router: Router, private userStorage: UserStorageService, private messageService: MessageService) {
    this.userPayload = this.decodedToken();
  }

  login(loginObj: any): void {
    this.api.post("auth/login", loginObj)
      .subscribe({
        next: (res) => {
          console.log(res.token);
          this.setToken(res.token);
          let tokenPayload = this.decodedToken();
          this.userStorage.setUserNameForStore(tokenPayload.unique_name)
          this.router.navigate(['admin']);
        },
        error: (err) => {
          console.log(err)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
        }
      })
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['admin', 'login'])
  }

  setToken(tokenValue: string): void {
    localStorage.setItem('token', tokenValue);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService;
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getUserName() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }
}