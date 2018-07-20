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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { ToastController } from 'ionic-angular';
import { ListaPage } from '../../pages/lista/lista';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { Storage } from '@ionic/storage';
var HomePage = /** @class */ (function () {
    function HomePage(storage, toastCtrl, navCtrl, barcodeScanner, variablesglobales, servicios) {
        var _this = this;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.itemData = [];
        this.items = [];
        this.posicion = 0;
        this.pos = 0;
        this.formulario = { valor: "" };
        this.lupa = false;
        this.topventas = 26;
        this.ocultar1 = false;
        this.ocultar2 = true;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultartodos = false;
        this.bg = "#ffffff";
        this.fon = "#000000";
        this.storage.get('email').then(function (val) {
            if (val != "" && val != null) {
                _this.variablesglobales.emailactivo = val;
                _this.variablesglobales.logged = true;
                _this.servicios.obtenernumerocesta(_this.variablesglobales.emailactivo).then(function (data) {
                    _this.datoscargados3 = data;
                    for (var _i = 0, _a = _this.datoscargados3; _i < _a.length; _i++) {
                        var dat = _a[_i];
                        console.log("El carrito tiene " + dat["valor"] + " productos añadidos");
                        _this.valorcesta = dat["valor"];
                        _this.variablesglobales.setValorcesta(dat["valor"]);
                        _this.valorcesta = _this.variablesglobales.getValorcesta();
                        _this.loadData();
                    }
                });
            }
        });
        this.storage.get('usuario').then(function (val) {
            _this.variablesglobales.CLIENTES_RAZSOCIAL = val;
        });
    }
    HomePage.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    HomePage.prototype.goToSlide = function () {
        this.slides.slideTo(2, 500);
    };
    HomePage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Situa el código a escanear "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.scanData = barcodeData;
            _this.variablesglobales.setBuscar2(barcodeData.text);
            _this.navCtrl.push(BuscarPage);
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    HomePage.prototype.openArticulo = function (value) {
        this.variablesglobales.setBuscar(value);
        this.navCtrl.push(ListaPage);
    };
    HomePage.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    HomePage.prototype.openPage = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(ListaartPage);
    };
    HomePage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    HomePage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    HomePage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    HomePage.prototype.loadData = function () {
        var _this = this;
        this.servicios.getMasVendidos(this.topventas).then(function (data) {
            _this.itemData = data;
            for (var x = 0; x < 5; x++) {
                if (_this.posicion < _this.itemData.length) {
                    _this.items.push(data[x]);
                    _this.posicion++;
                }
                else {
                    break;
                }
            } // fin for
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        setTimeout(function () {
            _this.pos = _this.posicion;
            for (var x = _this.posicion; x < _this.pos + 5; x++) {
                _this.posicion++;
                if (_this.posicion < _this.itemData.length) {
                    _this.items.push(_this.itemData[x]);
                }
                else {
                    break;
                }
            } // fin FOR
            _this.posicion = _this.posicion + 5;
            infiniteScroll.complete();
        }, 500);
    }; // fin Funcion doInfinite
    HomePage.prototype.accion1 = function () {
        this.ocultar2 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultar1 = !this.ocultar1;
    };
    HomePage.prototype.accion2 = function () {
        this.ocultar1 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultar2 = !this.ocultar2;
    };
    HomePage.prototype.openBuscar2 = function () {
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
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [Storage,
            ToastController,
            NavController,
            BarcodeScanner,
            VariablesGlobalesProvider,
            AppserviciosProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map