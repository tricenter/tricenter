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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { BuscarPage } from '../../pages/buscar/buscar';
//import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
var SubFamPage = /** @class */ (function () {
    function SubFamPage(navCtrl, navParams, servicios, variablesglobales) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.servicios = servicios;
        this.variablesglobales = variablesglobales;
        this.formulario = {
            valor: '',
            valor2: ''
        };
        this.loadData();
    }
    SubFamPage_1 = SubFamPage;
    SubFamPage.prototype.ionViewDidLoad = function () {
        console.log('Estas en subfamilia');
    };
    SubFamPage.prototype.loadData = function () {
        var _this = this;
        this.temaactivo = this.variablesglobales.gettema();
        this.imagentemaactivo = this.variablesglobales.getimagentema();
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
    SubFamPage.prototype.openPage = function (subtema) {
        console.log('Abrir la lista de articulos:' + subtema.ARTICULOS_SUBTEMA);
        this.variablesglobales.setlisart(subtema.ARTICULOS_SUBTEMA);
        this.navCtrl.push(ListaartPage);
    };
    SubFamPage.prototype.abrelaPage = function (page) {
        if (page == "subtema") {
            // statement(s) will execute if the boolean expression is true
            console.log("Esta es la página = " + page);
            this.navCtrl.push(SubFamPage_1);
        }
        if (page == "tema") {
            // statement(s) will execute if the boolean expression is true
            this.navCtrl.push(DatosPage);
        }
    };
    SubFamPage.prototype.openCatalogo = function () {
        console.log("ABRIR YA");
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(DatosPage);
    };
    SubFamPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    SubFamPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    SubFamPage.prototype.openBuscar = function () {
        this.navCtrl.push(BuscarPage);
    };
    SubFamPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    var SubFamPage_1;
    SubFamPage = SubFamPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-subfamilia',
            templateUrl: 'subfamilia.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AppserviciosProvider, VariablesGlobalesProvider])
    ], SubFamPage);
    return SubFamPage;
}());
export { SubFamPage };
//# sourceMappingURL=subfamilia.js.map