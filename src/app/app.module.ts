import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ClientesabcPage } from "./modals/clientesabc/clientesabc.page";
import { PedidosabcPage } from "./modals/pedidosabc/pedidosabc.page";
import { ServiciosabcComponent } from "./modals/serviciosabc/serviciosabc.component";
import { ImprimirComponent } from './modals/imprimir/imprimir.component';
@NgModule({
  declarations: [AppComponent, ClientesabcPage,PedidosabcPage,ServiciosabcComponent,ImprimirComponent],
  entryComponents: [ClientesabcPage,PedidosabcPage,ServiciosabcComponent,ImprimirComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
