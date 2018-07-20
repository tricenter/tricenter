var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { FiltroPage } from '../../pages/filtro/filtro';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { BuscarPage } from '../../pages/buscar/buscar';
import { CestaPage } from '../../pages/cesta/cesta';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';
var ListaPage = /** @class */ (function () {
    function ListaPage(navParams, servicios, barcodeScanner, variablesglobales, navCtrl, changeDetector, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.changeDetector = changeDetector;
        this.fb = fb;
        this.todayDate = new Date();
        this.fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' + this.todayDate.getHours() + '' + this.todayDate.getMinutes() + '' + this.todayDate.getSeconds());
        this.formulario = {
            valor: '',
            valor2: ''
        };
        this.items = [];
        this.itemsInCart = [];
        this.cartBadgeState = 'idle';
        this.myForm = this.fb.group({
            unidades: ['1', [Validators.required, Validators.pattern(/^([0-9]|1[0])$/)]],
            codigo: ['', [Validators.required, Validators.pattern(/^[1-9_-]{5,6}$/)]],
            ARTICULOS_DESNORMAL: ['',],
        });
        this.loadData();
        this.miModelo = {};
        this.items = [
            { title: 'Something', quantityInCart: 0, addButtonState: 'idle' }
        ];
    }
    ListaPage.prototype.openFiltro = function () {
        this.navCtrl.push(FiltroPage);
    };
    ListaPage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: "Situa el código a escanear "
        };
        this.barcodeScanner.scan(this.options).then(function (barcodeData) {
            console.log(barcodeData);
            _this.variablesglobales.setBuscar2(barcodeData.text);
            _this.navCtrl.push(BuscarPage);
            alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + _this.datoscargados);
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    ListaPage.prototype.encodeText = function () {
        var _this = this;
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then(function (encodedData) {
            console.log(encodedData);
            _this.encodedData = encodedData;
        }, function (err) {
            console.log("Ha ocurrido un error: " + err);
        });
    };
    ListaPage.prototype.loadData = function () {
        var _this = this;
        this.servicios.getBuscar(this.variablesglobales.buscar).then(function (data) {
            _this.datoscargados = data;
            //console.log("Obtiene valor = " + data);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ListaPage.prototype.addToCart = function (item) {
        item.quantityInCart = +1;
        item.addButtonState = 'adding';
        this.cartBadgeState = 'adding';
        this.changeDetector.detectChanges();
    };
    ListaPage.prototype.addToCartFinished = function (item) {
        this.cartBadgeState = 'idle';
        item.addButtonState = 'idle';
    };
    ListaPage.prototype.abrelaPage = function (page) {
        if (page == "subtema") {
            this.navCtrl.push(SubFamPage);
        }
        if (page == "tema") {
            this.navCtrl.push(DatosPage);
        }
    };
    ListaPage.prototype.openCatalogo = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(DatosPage);
    };
    ListaPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    ListaPage.prototype.openBuscar = function () {
        this.navCtrl.push(BuscarPage);
    };
    ListaPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    ListaPage.prototype.openBuscar2 = function () {
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    ListaPage.prototype.openCesta = function () {
        this.navCtrl.push(CestaPage);
    };
    ListaPage.prototype.cesta = function (value) {
        var _this = this;
        //var data = {};
        if (this.variablesglobales.emailactivo == "") {
            this.navCtrl.push(AreaclientePage);
            console.log("Debe iniciar sesion antes de comprar");
        }
        else {
            this.unidades = this.myForm.value.unidades;
            this.codigo = value;
            this.servicios.addCesta(this.codigo, this.fecha, this.unidades, this.variablesglobales.emailactivo).then(function (data) {
                _this.datoscargados2 = data;
                for (var _i = 0, _a = _this.datoscargados2; _i < _a.length; _i++) {
                    var dat = _a[_i];
                    console.log("Obtiene valorDATA = " + dat["RESULTADO"]);
                    if (dat["RESULTADO"] == "OK") {
                        /*
                         const toast = this.toastCtrl.create({
                           position: "top",
                           message: 'Artículo añadido.',
                           duration: 3000
                         });
                         toast.present();
                         */
                        _this.servicios.obtenernumerocesta(_this.variablesglobales.emailactivo).then(function (data) {
                            _this.datoscargados3 = data;
                            for (var _i = 0, _a = _this.datoscargados3; _i < _a.length; _i++) {
                                var dat_1 = _a[_i];
                                console.log("Obtiene valorDATA = " + dat_1["valor"]);
                                _this.variablesglobales.setValorcesta(dat_1["valor"]);
                            }
                        });
                    } // fin if
                } // fin for
            })
                .catch(function (error) {
                console.log(error);
            });
        }
    }; // fin cesta
    ListaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-lista',
            templateUrl: 'lista.html',
            animations: [
                trigger('cartBadge', [
                    state('idle', style({
                        opacity: '1',
                        backgroundColor: '#000000',
                        transform: 'scale(1)'
                    })),
                    state('adding', style({
                        opacity: '1',
                        backgroundColor: '#000000',
                        transform: 'scale(1)'
                    })),
                    transition('idle <=> adding', animate(750, keyframes([
                        style({ opacity: 0, transform: 'scale(1)', offset: 0 }),
                        style({ opacity: 1, transform: 'scale(1.3)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'scale(1)', offset: 1.0 })
                    ]))),
                ]),
                trigger('addButton', [
                    state('idle', style({
                        opacity: '1'
                    })),
                    state('adding', style({
                        opacity: '1',
                        fontWeight: 'bold'
                    })),
                    transition('idle <=> adding', animate('300ms linear')),
                    transition('void => *', [
                        style({ transform: 'translateX(200%)' }),
                        animate('300ms ease-in-out')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            BarcodeScanner,
            VariablesGlobalesProvider,
            NavController,
            ChangeDetectorRef,
            FormBuilder])
    ], ListaPage);
    return ListaPage;
}());
export { ListaPage };
//# sourceMappingURL=lista.js.map