import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AnimateModule } from 'primeng/animate';
import { ChipModule } from 'primeng/chip';

import { HomeComponent } from './components/home/home.component';
import { UiComponent } from './ui.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';



@NgModule({
  declarations: [
    UiComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    MenuComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    AnimateModule,
    ChipModule,
    RouterModule.forChild([
      {
        path: '', children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'menu', component: CategoryComponent },
          { path: 'menu/:categoryName', component: MenuComponent },
          { path: 'iletisim', component: ContactComponent }
        ]
      }
    ]),
  ],
  exports: [
    UiComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ]

})
export class UiModule { }
