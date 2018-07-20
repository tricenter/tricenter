var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PayPal } from '@ionic-native/paypal';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from '../pages/home/home';
import { DatosPage } from '../pages/datos/datos';
import { SubFamPage } from '../pages/subfamilia/subfamilia';
import { ListaartPage } from '../pages/listaart/listaart';
import { BuscarPage } from '../pages/buscar/buscar';
import { AreaclientePage } from '../pages/areacliente/areacliente';
import { AltausuarioPage } from '../pages/altausuario/altausuario';
import { DatosclientePage } from '../pages/datoscliente/datoscliente';
import { TiendasPage } from '../pages/tiendas/tiendas';
import { ListaPage } from '../pages/lista/lista';
import { CestaPage } from '../pages/cesta/cesta';
import { PiboPage } from '../pages/pibo/pibo';
import { PisaPage } from '../pages/pisa/pisa';
import { MairenaPage } from '../pages/mairena/mairena';
import { FiltroPage } from '../pages/filtro/filtro';
import { DatosaccesoPage } from '../pages/datosacceso/datosacceso';
import { PagoPage } from '../pages/pago/pago';
import { PedAntPage } from '../pages/ped-ant/ped-ant';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppserviciosProvider } from '../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../providers/variablesglobales/variablesglobales';
import { ComcabeceraComponent } from '../components/comcabecera/comcabecera';
import { CombuscarComponent } from '../components/combuscar/combuscar';
import { CompieComponent } from '../components/compie/compie';
import { ComcestaComponent } from '../components/comcesta/comcesta';
import { IonicStorageModule } from '@ionic/storage';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                DatosPage,
                SubFamPage,
                ListaartPage,
                CestaPage,
                AreaclientePage,
                AltausuarioPage,
                BuscarPage,
                TiendasPage,
                ListaPage,
                PiboPage,
                PisaPage,
                PedAntPage,
                MairenaPage,
                DatosclientePage,
                FiltroPage,
                DatosaccesoPage,
                PagoPage,
                ComcabeceraComponent,
                CompieComponent,
                ComcestaComponent,
                CombuscarComponent
            ],
            imports: [
                FormsModule,
                CustomFormsModule,
                BrowserModule,
                BrowserAnimationsModule,
                ReactiveFormsModule,
                IonicModule.forRoot(MyApp),
                IonicStorageModule.forRoot(),
                HttpModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                DatosPage,
                SubFamPage,
                ListaartPage,
                CestaPage,
                PiboPage,
                PisaPage,
                MairenaPage,
                AreaclientePage,
                AltausuarioPage,
                DatosclientePage,
                DatosaccesoPage,
                TiendasPage,
                PagoPage,
                PedAntPage,
                FiltroPage,
                ListaPage,
                BuscarPage
            ],
            providers: [
                StatusBar,
                SplashScreen,
                PayPal,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                AppserviciosProvider,
                VariablesGlobalesProvider,
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map