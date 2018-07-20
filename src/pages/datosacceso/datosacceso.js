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
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
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
var DatosaccesoPage = /** @class */ (function () {
    function DatosaccesoPage(navParams, servicios, toastCtrl, variablesglobales, navCtrl, fb) {
        this.navParams = navParams;
        this.servicios = servicios;
        this.toastCtrl = toastCtrl;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.formulario = {
            valor: ''
        };
        this.myForm = this.fb.group({
            razsocial: ['', [Validators.required]],
            nif: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-]{9,9}$/)]],
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
            telefono: ['', [Validators.pattern(/^[0-9_-]{9,11}$/)]],
            direccion: ['', Validators.required],
            cpostal: ['', [Validators.pattern(/^[0-9_-]{5,5}$/)]],
            poblacion: ['', Validators.required],
            provincia: ['', Validators.required],
            direccionentrega: ['', Validators.required],
        });
        this.getSelect();
    }
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
    DatosaccesoPage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    DatosaccesoPage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    DatosaccesoPage.prototype.openAreacliente = function () {
        this.navCtrl.push(AreaclientePage);
    };
    DatosaccesoPage.prototype.openAltausuario = function () {
        this.navCtrl.push(AltausuarioPage);
    };
    DatosaccesoPage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    DatosaccesoPage.prototype.loadData = function () {
        var _this = this;
        this.servicios.gettema()
            .then(function (data) {
            _this.arttemas = data;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DatosaccesoPage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    DatosaccesoPage.prototype.acceso = function () {
        var _this = this;
        this.servicios.getAcceso2(this.myForm.value.email, this.myForm.value.contrasena).then(function (data) {
            //this.datosacceso = data;
            _this.usuarioacceso = JSON.stringify(data);
            _this.usuarioaccesoarray = _this.usuarioacceso.split('"');
            _this.variablesglobales.username = _this.usuarioaccesoarray[3];
            _this.variablesglobales.emailactivo = _this.usuarioaccesoarray[15];
            _this.variablesglobales.setusername(_this.variablesglobales.username);
            _this.variablesglobales.setusermail(_this.variablesglobales.emailactivo);
            var toast = _this.toastCtrl.create({
                position: "bottom",
                message: 'Usuario identificado con éxito.',
                duration: 3000
            });
            toast.present();
            _this.variablesglobales.logged = true;
            _this.servicios.obtenernumerocesta(_this.variablesglobales.emailactivo).then(function (data) {
                _this.datoscargados4 = data;
                for (var _i = 0, _a = _this.datoscargados4; _i < _a.length; _i++) {
                    var dat = _a[_i];
                    console.log("Obtiene valorDATA = " + dat["valor"]);
                    _this.valorcesta = dat["valor"];
                    _this.variablesglobales.setValorcesta(dat["valor"]);
                    _this.valorcesta = _this.variablesglobales.getValorcesta();
                }
            });
            _this.getSelect();
        });
    };
    DatosaccesoPage.prototype.getSelect = function () {
        var _this = this;
        this.servicios.setSelect(this.variablesglobales.emailactivo)
            .then(function (data) {
            _this.usuariodatos = JSON.stringify(data);
            _this.usuariodatosarray = _this.usuariodatos.split('"');
            _this.variablesglobales.CLIENTES_CONTACTO = _this.usuariodatosarray[7];
            _this.variablesglobales.CLIENTES_RAZSOCIAL = _this.usuariodatosarray[11];
            _this.variablesglobales.CLIENTES_CONTRASENA = _this.usuariodatosarray[19];
            _this.variablesglobales.CLIENTES_EMAIL = _this.usuariodatosarray[31];
            _this.variablesglobales.CLIENTES_TELEFONO1 = _this.usuariodatosarray[23];
            _this.variablesglobales.CLIENTES_DIRECCION = _this.usuariodatosarray[27];
            _this.variablesglobales.CLIENTES_POBLACION = _this.usuariodatosarray[31];
            _this.variablesglobales.CLIENTES_PROVINCIA = _this.usuariodatosarray[35];
            _this.variablesglobales.CLIENTES_CPOSTAL = _this.usuariodatosarray[39];
            _this.variablesglobales.CLIENTES_NIF = _this.usuariodatosarray[43];
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    DatosaccesoPage.prototype.update = function () {
        this.variablesglobales.usuarioregistroarray = {};
        if (this.myForm.value.nombre == "") {
            this.variablesglobales.usuarioregistroarray["nombre"] = this.variablesglobales.CLIENTES_CONTACTO;
        }
        else {
            this.variablesglobales.usuarioregistroarray["nombre"] = this.myForm.value.nombre;
        }
        if (this.myForm.value.razsocial == "") {
            this.variablesglobales.usuarioregistroarray["razsocial"] = this.variablesglobales.CLIENTES_RAZSOCIAL;
        }
        else {
            this.variablesglobales.usuarioregistroarray["razsocial"] = this.myForm.value.razsocial;
        }
        if (this.myForm.value.contrasena == "") {
            this.variablesglobales.usuarioregistroarray["contrasena"] = this.variablesglobales.CLIENTES_CONTRASENA;
        }
        else {
            this.variablesglobales.usuarioregistroarray["contrasena"] = this.myForm.value.contrasena;
        }
        if (this.myForm.value.telefono == "") {
            this.variablesglobales.usuarioregistroarray["telefono"] = this.variablesglobales.CLIENTES_TELEFONO1;
        }
        else {
            this.variablesglobales.usuarioregistroarray["telefono"] = this.myForm.value.telefono;
        }
        if (this.myForm.value.direccion == "") {
            this.variablesglobales.usuarioregistroarray["direccion"] = this.variablesglobales.CLIENTES_DIRECCION;
        }
        else {
            this.variablesglobales.usuarioregistroarray["direccion"] = this.myForm.value.direccion;
        }
        if (this.myForm.value.cpostal == "") {
            this.variablesglobales.usuarioregistroarray["cpostal"] = this.variablesglobales.CLIENTES_CPOSTAL;
        }
        else {
            this.variablesglobales.usuarioregistroarray["cpostal"] = this.myForm.value.cpostal;
        }
        if (this.myForm.value.poblacion == "") {
            this.variablesglobales.usuarioregistroarray["poblacion"] = this.variablesglobales.CLIENTES_POBLACION;
        }
        else {
            this.variablesglobales.usuarioregistroarray["poblacion"] = this.myForm.value.poblacion;
        }
        if (this.myForm.value.provincia == "") {
            this.variablesglobales.usuarioregistroarray["provincia"] = this.variablesglobales.CLIENTES_PROVINCIA;
        }
        else {
            this.variablesglobales.usuarioregistroarray["provincia"] = this.myForm.value.provincia;
        }
        if (this.myForm.value.nif == "") {
            this.variablesglobales.usuarioregistroarray["nif"] = this.variablesglobales.CLIENTES_NIF;
        }
        else {
            this.variablesglobales.usuarioregistroarray["nif"] = this.myForm.value.nif;
        }
        this.variablesglobales.usuarioregistroarray["email"] = this.variablesglobales.emailactivo;
        this.servicios.addUpdate(this.variablesglobales.usuarioregistroarray);
        this.variablesglobales.setUpdate(this.variablesglobales.usuarioregistroarray);
        this.variablesglobales.getUpdate();
        this.variablesglobales.logged = true;
    };
    DatosaccesoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-datosacceso',
            templateUrl: 'datosacceso.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            AppserviciosProvider,
            ToastController,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], DatosaccesoPage);
    return DatosaccesoPage;
}());
export { DatosaccesoPage };
//# sourceMappingURL=datosacceso.js.map