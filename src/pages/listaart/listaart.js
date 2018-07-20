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
import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { FormBuilder, Validators } from '@angular/forms';
var ListaartPage = /** @class */ (function () {
    function ListaartPage(navParams, servicios, variablesglobales, navCtrl, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.formulario = {
            valor: '',
            valor2: ''
        };
        this.todayDate = new Date();
        this.fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' + this.todayDate.getHours() + '' + this.todayDate.getMinutes() + '' + this.todayDate.getSeconds());
        this.myForm = this.fb.group({
            unidades: ['1', [Validators.pattern(/^[0-9_-]{1,4}$/)]],
            codigo: ['', [Validators.pattern(/^[0-9_-]{5,6}$/)]],
            ARTICULOS_DESNORMAL: ['',],
        });
        this.loadData();
    }
    ListaartPage_1 = ListaartPage;
    ListaartPage.prototype.loadData = function () {
        var _this = this;
        this.temaactivo = this.variablesglobales.gettema();
        this.subtemaactivo = this.variablesglobales.getlisart();
        console.log("listart = " + this.temaactivo + "/" + this.subtemaactivo);
        this.servicios.getlistart(this.subtemaactivo).then(function (data) {
            _this.datoscargados = data;
            console.log("Obtiene valor = " + _this.datoscargados);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ListaartPage.prototype.openPage = function (subtema) {
        console.log('Abrir la lista de articulos:' + subtema.ARTICULOS_SUBTEMA);
        this.variablesglobales.setlisart(subtema.ARTICULOS_SUBTEMA);
        this.navCtrl.push(ListaartPage_1);
    };
    ListaartPage.prototype.abrelaPage = function (page) {
        if (page == "subtema") {
            this.navCtrl.push(SubFamPage);
        }
        if (page == "tema") {
            this.navCtrl.push(DatosPage);
        }
    };
    ListaartPage.prototype.ionViewDidLoad = function () {
        console.log('Estas en listaart');
    };
    ListaartPage.prototype.openCatalogo = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(DatosPage);
    };
    ListaartPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    ListaartPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    ListaartPage.prototype.openBuscar = function () {
        this.navCtrl.push(BuscarPage);
    };
    ListaartPage.prototype.openArticulo = function (value) {
        this.variablesglobales.setBuscar(value);
        this.navCtrl.push(ListaPage);
    };
    ListaartPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    ListaartPage.prototype.cesta = function (value) {
        if (this.variablesglobales.emailactivo == "") {
            this.navCtrl.push(AreaclientePage);
            console.log("Debe iniciar sesion antes de comprar");
        }
        else {
            this.unidades = this.myForm.value.unidades;
            this.codigo = value;
            console.log("Las unidades son " + this.unidades);
            console.log("El codigo del articulo es " + this.codigo);
            console.log("El E-Mail activo es " + this.variablesglobales.emailactivo);
            console.log("La fecha concatenada es " + this.fecha);
            this.servicios.addCesta(this.codigo, this.unidades, this.fecha, this.variablesglobales.emailactivo);
        }
    }; // fin cesta
    var ListaartPage_1;
    ListaartPage = ListaartPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-listaart',
            templateUrl: 'listaart.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], ListaartPage);
    return ListaartPage;
}());
export { ListaartPage };
//# sourceMappingURL=listaart.js.map