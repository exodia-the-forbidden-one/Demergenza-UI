import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MessageService, ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { ApiService } from './services/api.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { MenuReaderService } from './services/menu/menu-reader.service';
import { MenuWriterService } from './services/menu/menu-writer.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UiModule,
    HttpClientModule
  ],
  providers: [MessageService, ConfirmationService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    ApiService, MenuWriterService, MenuReaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
