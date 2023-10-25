import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'prefix', canActivate: [authGuard] }
    ])
  ]
})
export class AdminModule { }
