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
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { Storage } from '@ionic/storage';
var CombuscarComponent = /** @class */ (function () {
    /*
      knobValues: any = {
        upper:1000,
        lower:10
      }
    */
    function CombuscarComponent(storage, toastCtrl, navCtrl, barcodeScanner, variablesglobales, servicios, fb) {
        /*       this.storage.set('valorabuscar', '');
               this.storage.set('orden', '');
               this.storage.set('menor', '');
               this.storage.set('myor', '');
       */
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.fb = fb;
        this.formulario = { valor: "" };
        this.lupa = false;
        this.myForm = this.fb.group({
            precioFiltro: ['', [Validators.required]],
        });
    }
    CombuscarComponent.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    CombuscarComponent = __decorate([
        Component({
            selector: 'combuscar',
            templateUrl: 'combuscar.html'
        }),
        __metadata("design:paramtypes", [Storage,
            ToastController,
            NavController,
            BarcodeScanner,
            VariablesGlobalesProvider,
            AppserviciosProvider,
            FormBuilder])
    ], CombuscarComponent);
    return CombuscarComponent;
}());
export { CombuscarComponent };
//# sourceMappingURL=combuscar.js.map