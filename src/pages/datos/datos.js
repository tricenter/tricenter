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
import { Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../../pages/home/home';
import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { BuscarPage } from '../../pages/buscar/buscar';
//import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
var DatosPage = /** @class */ (function () {
    function DatosPage(navCtrl, navparams, variablesglobales, servicios, platform, statusBar, splashScreen) {
        this.navCtrl = navCtrl;
        this.navparams = navparams;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.formulario = {
            valor: ''
        };
        this.bg = "#ffffff";
        this.fon = "#000000";
        this.pages = [
            { title: 'Inicio', component: HomePage },
            { title: 'SubTemas', component: SubFamPage }
        ];
        // If we navigated to this page, we will have an item available as a nav param
        //this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.loadData();
    }
    DatosPage_1 = DatosPage;
    DatosPage.prototype.loadData = function () {
        var _this = this;
        this.servicios.gettema()
            .then(function (data) {
            _this.arttemas = data;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DatosPage.prototype.ionViewDidLoad = function () {
        console.log('Estas en DatosPage');
    };
    DatosPage.prototype.openPage = function (subtema) {
        console.log('Abrir los subtemas:' + subtema.ARTICULOS_TEMA);
        this.variablesglobales.settema(subtema.ARTICULOS_TEMA);
        this.variablesglobales.setimagentema(subtema.ARTICULOS_IMAGEN);
        this.navCtrl.push(SubFamPage);
    };
    DatosPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
        this.variablesglobales.lupa = false;
    };
    DatosPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
        this.variablesglobales.lupa = false;
    };
    DatosPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage_1);
        this.variablesglobales.lupa = false;
    };
    /*    openBuscar() {
        
        console.log(this.formulario.valor);
         
          if(this.formulario.valor.length > 0){
            console.log("EL USUARIO ESTA UTILIZANDO EL BUSCADOR");
            this.navCtrl.push(BuscarPage);
          }
        }
    */
    DatosPage.prototype.openBuscar2 = function () {
        //console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    var DatosPage_1;
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], DatosPage.prototype, "nav", void 0);
    DatosPage = DatosPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-datos',
            templateUrl: 'datos.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            VariablesGlobalesProvider,
            AppserviciosProvider,
            Platform,
            StatusBar,
            SplashScreen])
    ], DatosPage);
    return DatosPage;
}());
export { DatosPage };
//# sourceMappingURL=datos.js.map