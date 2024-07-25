import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/v1/login/login.module';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { JwtInterceptor } from './core/guards/interceptors/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForbidenComponent } from './features/v1/forbiden/components/forbiden.component';
import { HomeComponent } from './features/v1/home/components/home.component';
import { HomeModule } from './features/v1/home/home.module';
import { CloudSvgComponent } from './features/v1/svg/cloud-svg/cloud-svg.component';
import { RegistroComponent } from './features/v1/registro/components/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    ForbidenComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MaterialModule,
    LoginModule,
    HomeModule,
    BrowserAnimationsModule
],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
