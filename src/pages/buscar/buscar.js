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
import { ListaPage } from '../../pages/lista/lista';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
var BuscarPage = /** @class */ (function () {
    function BuscarPage(navParams, servicios, toastCtrl, variablesglobales, navCtrl, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.toastCtrl = toastCtrl;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.todayDate = new Date();
        this.fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' + this.todayDate.getHours() + '' + this.todayDate.getMinutes() + '' + this.todayDate.getSeconds());
        this.formulario = { valor: '', };
        this.itemData = [];
        this.items = [];
        this.posicion = 0;
        this.pos = 0;
        this.myForm = this.fb.group({
            unidades: ['1', [Validators.required, Validators.pattern(/^([0-9]|1[0])$/)]],
            codigo: ['', [Validators.required, Validators.pattern(/^[1-9_-]{5,6}$/)]],
            ARTICULOS_DESNORMAL: ['',],
        });
        this.loadData();
        this.miModelo = {};
    }
    BuscarPage.prototype.openLista = function () {
        this.navCtrl.push(ListaPage);
    };
    BuscarPage.prototype.openArticulo = function (value) {
        this.variablesglobales.setBuscar(value);
        this.navCtrl.push(ListaPage);
    };
    BuscarPage.prototype.loadData = function () {
        var _this = this;
        if (this.variablesglobales.lower == null && this.variablesglobales.upper == null) {
            this.variablesglobales.lower = 0;
            this.variablesglobales.upper = 1000;
        }
        this.servicios.getBuscar2(this.variablesglobales.buscar2, this.variablesglobales.lower, this.variablesglobales.upper).then(function (data) {
            _this.itemData = data;
            if (_this.itemData == "" || _this.itemData == null) {
                var toast = _this.toastCtrl.create({
                    position: "bottom",
                    message: 'Ese articulo no se encuentra en nuestro almacen',
                    duration: 3000
                });
                toast.present();
            }
            else {
                for (var x = 0; x < 5; x++) {
                    if (_this.posicion < _this.itemData.length) {
                        _this.items.push(data[x]);
                        _this.posicion++;
                    }
                    else {
                        break;
                    }
                } // fin for
            } // fin else
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    BuscarPage.prototype.doInfinite = function (infiniteScroll) {
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
    BuscarPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-buscar',
            templateUrl: 'buscar.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            ToastController,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], BuscarPage);
    return BuscarPage;
}());
export { BuscarPage };
//# sourceMappingURL=buscar.js.map