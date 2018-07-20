var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
//import { IonicApp, IonicModule} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from '../pages/home/home';
import { PedAntPage } from '../pages/ped-ant/ped-ant';
//import { DatosPage } from '../pages/datos/datos';
//import { SubFamPage } from '../pages/subfamilia/subfamilia';
//import { ListaartPage } from '../pages/listaart/listaart';
//import { BuscarPage } from '../pages/buscar/buscar';
import { AreaclientePage } from '../pages/areacliente/areacliente';
import { AltausuarioPage } from '../pages/altausuario/altausuario';
import { DatosclientePage } from '../pages/datoscliente/datoscliente';
//import { TiendasPage } from '../pages/tiendas/tiendas';
//import { CestaPage } from '../pages/cesta/cesta';
//import { PiboPage } from '../pages/pibo/pibo';
//import { PisaPage } from '../pages/pisa/pisa';
//import { MairenaPage } from '../pages/mairena/mairena';
//import { DatosaccesoPage } from '../pages/datosacceso/datosacceso';
import { AppserviciosProvider } from '../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../providers/variablesglobales/variablesglobales';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, servicios, variablesglobales) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.servicios = servicios;
        this.variablesglobales = variablesglobales;
        this.rootPage = HomePage;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pageslogged = [
            { title: 'Mi cuenta', component: DatosclientePage },
            //  { title: 'Modificar datos de acceso', component: DatosaccesoPage }, 
            { title: 'Pedidos realizados', component: PedAntPage }
            //  { title: 'Consultar sus facturas', component: HomePage }
        ];
        this.pages = [
            { title: 'Iniciar sesión', component: AreaclientePage },
            { title: 'Registrarse', component: AltausuarioPage }
        ];
    } // fin constructor
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
        });
    };
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
            selector: 'tasks',
            providers: [
                StatusBar,
                SplashScreen,
                BarcodeScanner,
                VariablesGlobalesProvider,
                AppserviciosProvider,
            ]
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, AppserviciosProvider, VariablesGlobalesProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map