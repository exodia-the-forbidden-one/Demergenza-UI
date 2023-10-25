import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { authGuard } from '../guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
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
