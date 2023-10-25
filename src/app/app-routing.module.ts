import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from './ui/ui.module';
import { UiComponent } from './ui/ui.component';
import { AdminModule } from './admin/admin.module';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', component: UiComponent, loadChildren: () => UiModule },
  { path: 'admin', component: AdminComponent, loadChildren: () => AdminModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
