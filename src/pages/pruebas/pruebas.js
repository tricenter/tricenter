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
import { App, ViewController } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
/**
 * Generated class for the PruebasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PruebasPage = /** @class */ (function () {
    function PruebasPage(viewCtrl, appCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.appCtrl = appCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PruebasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PruebasPage');
    };
    PruebasPage.prototype.pushPage = function () {
        this.navCtrl.push(ListPage);
    };
    PruebasPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pruebas',
            templateUrl: 'pruebas.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            App,
            NavController,
            NavParams])
    ], PruebasPage);
    return PruebasPage;
}());
export { PruebasPage };
//# sourceMappingURL=pruebas.js.map