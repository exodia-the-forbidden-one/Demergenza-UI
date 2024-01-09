import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { AnimateModule } from 'primeng/animate';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { HomeComponent } from './components/home/home.component';
import { UiComponent } from './ui.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { CategoryComponent } from './components/category/category.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';



@NgModule({
  declarations: [
    UiComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    MenuComponent,
    ContactComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    AnimateModule,
    ChipModule,
    BreadcrumbModule,
    RouterModule.forChild([
      {
        path: '', children: [
          { path: '', component: HomeComponent },
          { path: 'menu', component: CategoryComponent },
          { path: 'menu/:categoryName', component: MenuComponent },
          { path: 'iletisim', component: ContactComponent },
          { path: 'hakkimizda', component: AboutUsComponent }
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
