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
//import { Input } from '@angular/core';
//import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
//import { ListaartPage } from '../../pages/listaart/listaart';
//import { ListPage } from '../../pages/list/list';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { FormBuilder, Validators } from '@angular/forms';
//import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
var AltausuarioPage = /** @class */ (function () {
    function AltausuarioPage(navParams, servicios, variablesglobales, navCtrl, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.nuevadireccion = "";
        this.formulario = { valor: '' };
        this.myForm = this.fb.group({
            razsocial: ['', [Validators.required]],
            nif: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{9,9}$/)]],
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
            telefono: ['', [Validators.pattern(/^[0-9_-]{9,11}$/)]],
            direccion: ['', Validators.required],
            cpostal: ['', [Validators.pattern(/^[0-9_-]{5,5}$/)]],
            poblacion: [''],
            provincia: [''],
            direccionentrega: [''],
        });
    }
    AltausuarioPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    AltausuarioPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    AltausuarioPage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    AltausuarioPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    AltausuarioPage.prototype.loadData = function () {
        var _this = this;
        this.servicios.gettema()
            .then(function (data) {
            _this.arttemas = data;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AltausuarioPage.prototype.registro = function () {
        this.variablesglobales.usuarioregistroarray = {};
        // this.variablesglobales.usuarioregistroarray["nombre"] = this.myForm.value.nombre;
        this.variablesglobales.usuarioregistroarray["razsocial"] = this.myForm.value.razsocial;
        this.variablesglobales.usuarioregistroarray["email"] = this.myForm.value.email;
        this.variablesglobales.usuarioregistroarray["contrasena"] = this.myForm.value.contrasena;
        this.variablesglobales.usuarioregistroarray["telefono"] = this.myForm.value.telefono;
        this.variablesglobales.usuarioregistroarray["direccion"] = this.myForm.value.direccion;
        this.variablesglobales.usuarioregistroarray["cpostal"] = this.myForm.value.cpostal;
        this.variablesglobales.usuarioregistroarray["poblacion"] = this.myForm.value.poblacion;
        this.variablesglobales.usuarioregistroarray["provincia"] = this.myForm.value.provincia;
        this.variablesglobales.usuarioregistroarray["nif"] = this.myForm.value.nif;
        this.variablesglobales.usuarioregistroarray["entrega"] = this.myForm.value.direccionentrega;
        this.servicios.addRegistro(this.variablesglobales.usuarioregistroarray);
        this.variablesglobales.setRegistro(this.variablesglobales.usuarioregistroarray);
        if (this.myForm.dirty && this.myForm.valid) {
            alert("Por favor compruebe su bandeja de entrada en " + this.myForm.value.email);
        }
    };
    /*
    public type = "password";
    public mostrar = false;
  
    showPassword()
    {
      this.mostrar =! this.mostrar;
        if (this.mostrar){
            this.type = "text";
        }
        else {
            this.type = "password";
        }
    }
  */
    AltausuarioPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    AltausuarioPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-altausuario',
            templateUrl: 'altausuario.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], AltausuarioPage);
    return AltausuarioPage;
}());
export { AltausuarioPage };
//# sourceMappingURL=altausuario.js.map