var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
//import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { BuscarPage } from '../../pages/buscar/buscar';
//import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, variablesglobales, servicios) {
        this.navCtrl = navCtrl;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.formulario = {
            valor: '',
            valor2: ''
        };
        this.loadData();
    }
    ListPage.prototype.loadData = function () {
        var _this = this;
        this.temaactivo = this.variablesglobales.gettema();
        console.log("Abre datos page con valor = " + this.temaactivo);
        this.servicios.getsubtema(this.temaactivo)
            .then(function (data) {
            _this.artsubtemas = data;
            console.log("Obtiene valor = " + data);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListPage');
    };
    ListPage.prototype.openCatalogo = function () {
        console.log("ABRIR YA");
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(DatosPage);
    };
    ListPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    ListPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    ListPage.prototype.openBuscar = function () {
        this.navCtrl.push(BuscarPage);
    };
    ListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-list',
            templateUrl: 'list.html',
        }),
        __metadata("design:paramtypes", [NavController,
            VariablesGlobalesProvider,
            AppserviciosProvider])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map