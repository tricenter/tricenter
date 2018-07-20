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
//import { ChangeDetectorRef } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { HomePage } from '../../pages/home/home';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
//import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { MairenaPage } from '../../pages/mairena/mairena';
import { PisaPage } from '../../pages/pisa/pisa';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
var PiboPage = /** @class */ (function () {
    function PiboPage(
    //private toastCtrl: ToastController,
    navCtrl, barcodeScanner, 
    //private changeDetector: ChangeDetectorRef,
    variablesglobales, servicios) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.items = [];
        this.itemsInCart = [];
        this.cartBadgeState = 'idle';
        this.formulario = {
            valor: '',
            valor2: ''
        };
        this.bg = "#ffffff";
        this.fon = "#000000";
    }
    PiboPage_1 = PiboPage;
    PiboPage.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    PiboPage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Situa el código a escanear "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.scanData = barcodeData;
            _this.variablesglobales.setBuscar2(barcodeData.text);
            _this.navCtrl.push(BuscarPage);
            alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + _this.datoscargados);
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    PiboPage.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    PiboPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    PiboPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    PiboPage.prototype.openPibo = function () {
        this.navCtrl.push(PiboPage_1);
    };
    PiboPage.prototype.openPisa = function () {
        this.navCtrl.push(PisaPage);
    };
    PiboPage.prototype.openMairena = function () {
        this.navCtrl.push(MairenaPage);
    };
    PiboPage.prototype.openPage = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(ListaartPage);
    };
    PiboPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    PiboPage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    PiboPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    var PiboPage_1;
    PiboPage = PiboPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pibo',
            templateUrl: 'pibo.html',
        }),
        __metadata("design:paramtypes", [NavController,
            BarcodeScanner,
            VariablesGlobalesProvider,
            AppserviciosProvider])
    ], PiboPage);
    return PiboPage;
}());
export { PiboPage };
//# sourceMappingURL=pibo.js.map