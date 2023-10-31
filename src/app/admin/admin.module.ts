import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';

import { authGuard } from '../guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
    AdminComponent,
    DashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    FileUploadModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: 'login', component: LoginComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: 'menu', component: MenuComponent, pathMatch: 'prefix', canActivate: [authGuard] }
    ])
  ],
})
export class AdminModule { }
