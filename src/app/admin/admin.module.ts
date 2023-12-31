import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from 'primeng/chips';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';

import { authGuard } from '../guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModifyContentComponent } from './components/modify-content/modify-content.component';

@NgModule({
  declarations: [
    LoginComponent,
    SidebarComponent,
    AdminComponent,
    DashboardComponent,
    MenuComponent,
    ModifyContentComponent
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
    ChipsModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule,
    FieldsetModule,
    RouterModule.forChild([
      // { path: '', component: DashboardComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: '', redirectTo: '/admin/menu', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: 'menu', component: MenuComponent, pathMatch: 'prefix', canActivate: [authGuard] },
      { path: 'content', component: ModifyContentComponent, pathMatch: 'prefix', canActivate: [authGuard] }
    ])
  ],
})
export class AdminModule { }
