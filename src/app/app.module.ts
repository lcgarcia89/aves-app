import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainMenu } from '../pages/main-menu/main-menu';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { BirdsServiceProvider } from '../providers/birds-service/birds-service';
import { ListaAves } from "../pages/lista-aves/lista-aves";
import {DetalleAve} from "../pages/detalle-ave/detalle-ave";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainMenu,
    ListaAves,
    DetalleAve
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainMenu,
    ListaAves,
    DetalleAve
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    BirdsServiceProvider
  ]
})
export class AppModule {}
