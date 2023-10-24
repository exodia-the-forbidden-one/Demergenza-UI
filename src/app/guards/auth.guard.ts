import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../admin/components/login/login.component';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) {
    if (route.component == LoginComponent) {
      router.navigate(['admin', 'dashboard'])
    }
    return true;
  }
  else {
    if (route.component != LoginComponent) {
      router.navigate(['admin', 'login'])
      return false
    }
    return true;
  }
};
