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
//import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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
import { PiboPage } from '../../pages/pibo/pibo';
import { PisaPage } from '../../pages/pisa/pisa';
import { MairenaPage } from '../../pages/mairena/mairena';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
var TiendasPage = /** @class */ (function () {
    //options :BarcodeScannerOptions;
    function TiendasPage(
    //private toastCtrl: ToastController,
    navCtrl, 
    // private barcodeScanner: BarcodeScanner,
    // private changeDetector: ChangeDetectorRef,
    variablesglobales, servicios) {
        this.navCtrl = navCtrl;
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
    TiendasPage_1 = TiendasPage;
    TiendasPage.prototype.logForm = function (form) {
        console.log(form.value);
    };
    ;
    /*
      scan(){
          this.options = {
              prompt : "Situa el código a escanear "
          }
    
        this.barcodeScanner.scan(this.options).then((barcodeData) => {
        console.log(barcodeData);
        this.scanData = barcodeData;
    
         this.variablesglobales.setBuscar2(barcodeData.text);
         this.navCtrl.push(BuscarPage);
    
        alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + this.datoscargados);
        }, (err) => {
            console.log("Ha ocurrido un error: " + err);
        });
      }
        
      encodeText(){
        this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {
    
            console.log(encodedData);
            this.encodedData = encodedData;
    
        }, (err) => {
            console.log("Ha ocurrido un error: " + err);
        });
      }
    */
    TiendasPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    TiendasPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage_1);
    };
    TiendasPage.prototype.openPibo = function () {
        this.navCtrl.push(PiboPage);
    };
    TiendasPage.prototype.openPisa = function () {
        this.navCtrl.push(PisaPage);
    };
    TiendasPage.prototype.openMairena = function () {
        this.navCtrl.push(MairenaPage);
    };
    TiendasPage.prototype.openPage = function () {
        this.variablesglobales.settema("ESCOLAR");
        this.variablesglobales.setlisart("REGLAS");
        this.navCtrl.push(ListaartPage);
    };
    TiendasPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    TiendasPage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    TiendasPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    var TiendasPage_1;
    TiendasPage = TiendasPage_1 = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tiendas',
            templateUrl: 'tiendas.html',
        }),
        __metadata("design:paramtypes", [NavController,
            VariablesGlobalesProvider,
            AppserviciosProvider])
    ], TiendasPage);
    return TiendasPage;
}());
export { TiendasPage };
//# sourceMappingURL=tiendas.js.map