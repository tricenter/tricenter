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
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { FormBuilder } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
var FiltroPage = /** @class */ (function () {
    function FiltroPage(storage, toastCtrl, navCtrl, barcodeScanner, variablesglobales, servicios, fb) {
        var _this = this;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.fb = fb;
        this.structure = { lower: 0, upper: 1000 };
        this.formulario = { valor: "" };
        this.lupa = false;
        this.storage.get('valorabuscar').then(function (val) {
            _this.formulario.valor = val;
        });
        /*
    this.myForm = this.fb.group({
      precioFiltro: ['', [Validators.required]],
    });
    */
    }
    FiltroPage.prototype.onChange = function (ev) {
        //console.log('Rango de precio entre ' + this.structure.lower + ' y ' + this.structure.upper + ' euros');
    };
    FiltroPage.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    FiltroPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    FiltroPage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Situa el código a escanear "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            _this.variablesglobales.setBuscar2(barcodeData.text);
            _this.navCtrl.push(BuscarPage);
            alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + _this.datoscargados);
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    FiltroPage.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    FiltroPage.prototype.openPage = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(ListaartPage);
    };
    FiltroPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    FiltroPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    FiltroPage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    FiltroPage.prototype.openBuscar2 = function () {
        console.log('Rango de precio entre ' + this.structure.lower + ' y ' + this.structure.upper + ' euros');
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
                console.log("Busqueda vacia");
            }
            else {
                this.variablesglobales.setBuscar2(this.formulario.valor);
                this.variablesglobales.setLower(this.structure.lower);
                this.variablesglobales.setUpper(this.structure.upper);
                this.navCtrl.push(BuscarPage);
            }
        }
    };
    FiltroPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-filtro',
            templateUrl: 'filtro.html',
        }),
        __metadata("design:paramtypes", [Storage,
            ToastController,
            NavController,
            BarcodeScanner,
            VariablesGlobalesProvider,
            AppserviciosProvider,
            FormBuilder])
    ], FiltroPage);
    return FiltroPage;
}());
export { FiltroPage };
//# sourceMappingURL=filtro.js.map