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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { CestaPage } from '../../pages/cesta/cesta';
import { FiltroPage } from '../../pages/filtro/filtro';
import { HomePage } from '../../pages/home/home';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
var ComcabeceraComponent = /** @class */ (function () {
    function ComcabeceraComponent(toastCtrl, navCtrl, barcodeScanner, variablesglobales, 
    //private changeDetector: ChangeDetectorRef,
    servicios) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.formulario = { valor: "" };
        this.lupa = false;
        this.text = '';
        this.bg = "#ffffff";
        this.fon = "#000000";
        this.variablesglobales.lupa = false; // cierra el campo de busqueda al cambiar de pagina
    }
    ComcabeceraComponent.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    ComcabeceraComponent.prototype.openFiltro = function () {
        this.navCtrl.push(FiltroPage);
    };
    ComcabeceraComponent.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    ComcabeceraComponent.prototype.openCesta = function () {
        if (this.variablesglobales.logged != true) {
            this.navCtrl.push(AreaclientePage);
        }
        else {
            this.navCtrl.push(CestaPage);
        }
    };
    ComcabeceraComponent.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Situa el código a escanear "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.variablesglobales.setBuscar2(barcodeData.text);
            _this.navCtrl.push(BuscarPage);
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    ComcabeceraComponent.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
        }, function (err) {
        });
    };
    ComcabeceraComponent.prototype.openPage = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(ListaartPage);
    };
    ComcabeceraComponent.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    ComcabeceraComponent.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    ComcabeceraComponent.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    ComcabeceraComponent.prototype.openDatoscliente = function () {
        this.navCtrl.push(DatosclientePage);
    };
    ComcabeceraComponent.prototype.openBuscar2 = function () {
        if (this.formulario.valor.length == 1 || this.formulario.valor.length == 2) {
            var toast = this.toastCtrl.create({
                position: "bottom",
                message: 'Introduzca al menos tres caracteres.',
                duration: 2000
            });
            toast.present();
        }
        else {
            if (this.formulario.valor.length == 0) {
                console.log("");
            }
            else {
                this.variablesglobales.setBuscar2(this.formulario.valor);
                this.navCtrl.push(BuscarPage);
            }
        }
    };
    ComcabeceraComponent.prototype.abreBusqueda = function () {
        if (this.variablesglobales.lupa == true) {
            this.variablesglobales.lupa = false;
        }
        else {
            this.variablesglobales.lupa = true;
        }
    };
    ComcabeceraComponent = __decorate([
        Component({
            selector: 'comcabecera',
            templateUrl: 'comcabecera.html',
        }),
        __metadata("design:paramtypes", [ToastController,
            NavController,
            BarcodeScanner,
            VariablesGlobalesProvider,
            AppserviciosProvider])
    ], ComcabeceraComponent);
    return ComcabeceraComponent;
}());
export { ComcabeceraComponent };
//# sourceMappingURL=comcabecera.js.map