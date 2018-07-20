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
/**
 * Generated class for the PedAntPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PedAntPage = /** @class */ (function () {
    function PedAntPage(variablesglobales, servicios, navCtrl, navParams) {
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.itemData = [];
        this.items = [];
        this.posicion = 0;
        this.pos = 0;
    }
    PedAntPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("Entras en Ped-Ant");
        this.servicios.getpedidosanteriores(this.variablesglobales.emailactivo).then(function (data) {
            _this.itemData = data;
            console.debug(_this.itemData.length);
            for (var x = 0; x < _this.itemData.length; x++) {
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
    PedAntPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-ped-ant',
            templateUrl: 'ped-ant.html',
        }),
        __metadata("design:paramtypes", [VariablesGlobalesProvider,
            AppserviciosProvider,
            NavController,
            NavParams])
    ], PedAntPage);
    return PedAntPage;
}());
export { PedAntPage };
//# sourceMappingURL=ped-ant.js.map