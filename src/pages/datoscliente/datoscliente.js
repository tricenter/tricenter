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
//import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
//import { ListaartPage } from '../../pages/listaart/listaart';
//import { ListPage } from '../../pages/list/list';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { AltausuarioPage } from '../../pages/altausuario/altausuario';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { FormBuilder, Validators } from '@angular/forms';
//import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
//import { Pipe, PipeTransform, ViewChild, Input, Directive} from '@angular/core';
//import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
var DatosclientePage = /** @class */ (function () {
    function DatosclientePage(navParams, servicios, toastCtrl, variablesglobales, navCtrl, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.toastCtrl = toastCtrl;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.formulario = { valor: '' };
        this.getSelect();
        this.myForm = this.fb.group({
            razsocial: ['', [Validators.required]],
            nif: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{9,9}$/)]],
            //email: ['', [Validators.required, Validators.email]],
            //contrasena: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
            telefono: ['', [Validators.pattern(/^[0-9_-]{9,11}$/)]],
            direccion: ['', Validators.required],
            cpostal: ['', [Validators.pattern(/^[0-9_-]{5,5}$/)]],
            poblacion: [''],
            provincia: [''],
            direccionentrega: [''],
            contrasena: [''],
        });
    }
    DatosclientePage.prototype.ionViewDidLoad = function () { console.log('Estas en DatosCliente'); };
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
    DatosclientePage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    DatosclientePage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    DatosclientePage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    DatosclientePage.prototype.openAltausuario = function () {
        this.navCtrl.push(AltausuarioPage);
    };
    DatosclientePage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    DatosclientePage.prototype.loadData = function () {
        var _this = this;
        this.servicios.gettema()
            .then(function (data) {
            _this.arttemas = data;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DatosclientePage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    DatosclientePage.prototype.acceso = function () {
        var _this = this;
        this.servicios.getAcceso2(this.myForm.value.email, this.myForm.value.contrasena).then(function (data) {
            //this.datosacceso = data;
            var usuarioacceso2;
            usuarioacceso2 = data;
            _this.usuarioaccesoarray = _this.usuarioacceso.split('"');
            for (var _i = 0, usuarioacceso2_1 = usuarioacceso2; _i < usuarioacceso2_1.length; _i++) {
                var usu = usuarioacceso2_1[_i];
                _this.variablesglobales.username = usu["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.emailactivo = usu["CLIENTES_EMAIL"];
            }
            _this.variablesglobales.setusername(_this.variablesglobales.username);
            _this.variablesglobales.setusermail(_this.variablesglobales.emailactivo);
            var toast = _this.toastCtrl.create({
                position: "bottom",
                message: 'Usuario identificado con éxito.',
                duration: 3000
            });
            toast.present();
            _this.variablesglobales.logged = true;
            _this.getSelect();
        });
    };
    DatosclientePage.prototype.getSelect = function () {
        var _this = this;
        this.servicios.setSelect(this.variablesglobales.emailactivo)
            .then(function (data) {
            _this.usuariodatos = data;
            for (var _i = 0, _a = _this.usuariodatos; _i < _a.length; _i++) {
                var usu2 = _a[_i];
                console.log("El valor que falla :" + usu2["CLIENTES_NIF"]);
                _this.variablesglobales.CLIENTES_CONTACTO = usu2["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.CLIENTES_RAZSOCIAL = usu2["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.CLIENTES_CONTRASENA = usu2["CLIENTES_CONTRASENA"];
                _this.variablesglobales.CLIENTES_EMAIL = usu2["CLIENTES_EMAIL"];
                _this.variablesglobales.CLIENTES_TELEFONO1 = usu2["CLIENTES_TELEFONO1"];
                _this.variablesglobales.CLIENTES_DIRECCION = usu2["CLIENTES_DIRECCION"];
                _this.variablesglobales.CLIENTES_POBLACION = usu2["CLIENTES_POBLACION"];
                _this.variablesglobales.CLIENTES_PROVINCIA = usu2["CLIENTES_PROVINCIA"];
                _this.variablesglobales.CLIENTES_CPOSTAL = usu2["CLIENTES_CPOSTAL"];
                _this.variablesglobales.CLIENTES_NIF = usu2["CLIENTES_NIF"];
                _this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = usu2["CLIENTES_DIRECCION_ENTREGA"];
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DatosclientePage.prototype.update = function () {
        this.variablesglobales.usuarioregistroarray = {};
        this.variablesglobales.usuarioregistroarray["nombre"] = this.myForm.value.razsocial;
        this.variablesglobales.usuarioregistroarray["razsocial"] = this.myForm.value.razsocial;
        this.variablesglobales.usuarioregistroarray["contrasena"] = this.myForm.value.contrasena;
        this.variablesglobales.usuarioregistroarray["telefono"] = this.myForm.value.telefono;
        this.variablesglobales.usuarioregistroarray["direccion"] = this.myForm.value.direccion;
        this.variablesglobales.usuarioregistroarray["cpostal"] = this.myForm.value.cpostal;
        this.variablesglobales.usuarioregistroarray["poblacion"] = this.myForm.value.poblacion;
        this.variablesglobales.usuarioregistroarray["provincia"] = this.myForm.value.provincia;
        this.variablesglobales.usuarioregistroarray["nif"] = this.myForm.value.nif;
        this.variablesglobales.usuarioregistroarray["entrega"] = this.myForm.value.direccionentrega;
        this.variablesglobales.usuarioregistroarray["email"] = this.variablesglobales.emailactivo;
        this.servicios.addUpdate(this.variablesglobales.usuarioregistroarray);
        this.variablesglobales.setUpdate(this.variablesglobales.usuarioregistroarray);
        this.variablesglobales.getUpdate();
        this.variablesglobales.logged = true;
        var toast = this.toastCtrl.create({
            position: "bottom",
            message: 'Datos actualizados correctamente.',
            duration: 2000
        });
        toast.present();
    };
    DatosclientePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-datoscliente',
            templateUrl: 'datoscliente.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            ToastController,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], DatosclientePage);
    return DatosclientePage;
}());
export { DatosclientePage };
//# sourceMappingURL=datoscliente.js.map