import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './Shared/shared.module';
import { ChartsModule } from 'ng2-charts';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from './services/web-socket.service';
import { environment } from 'src/environments/environment.prod';

const config: SocketIoConfig = { url: environment.URL_SOCKET, options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
  ],
  exports:[
  ],
  providers: [WebSocketService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
