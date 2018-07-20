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
import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { FormBuilder, Validators } from '@angular/forms';
//import { Http } from '@angular/http';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { Storage } from '@ionic/storage';
var AreaclientePage = /** @class */ (function () {
    function AreaclientePage(storage, navParams, toastCtrl, servicios, variablesglobales, navCtrl, fb) {
        this.storage = storage;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.servicios = servicios;
        this.variablesglobales = variablesglobales;
        this.navCtrl = navCtrl;
        this.fb = fb;
        this.formulario = {
            valor: ''
        };
        this.myForm = this.fb.group({
            email: ['tecnico@tricenter.net', [Validators.required, Validators.email]],
            contrasena: ['tri001', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
        });
    }
    AreaclientePage.prototype.openInicio = function () {
        this.navCtrl.push(HomePage);
    };
    AreaclientePage.prototype.openCatalogo = function () {
        this.navCtrl.push(DatosPage);
    };
    AreaclientePage.prototype.openAltausuario = function () {
        this.navCtrl.push(AltausuarioPage);
    };
    AreaclientePage.prototype.openTiendas = function () {
        this.navCtrl.push(TiendasPage);
    };
    AreaclientePage.prototype.loadData = function () {
        var _this = this;
        this.servicios.gettema()
            .then(function (data) {
            _this.arttemas = data;
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AreaclientePage.prototype.acceso = function () {
        var _this = this;
        this.servicios.getAcceso2(this.myForm.value.email, this.myForm.value.contrasena).then(function (data) {
            _this.datosacceso = data;
            _this.usuarioacceso = JSON.stringify(data);
            _this.usuarioaccesoarray = _this.usuarioacceso.split('"');
            for (var _i = 0, _a = _this.datosacceso; _i < _a.length; _i++) {
                var usu = _a[_i];
                _this.variablesglobales.username = usu["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.emailactivo = usu["CLIENTES_EMAIL"];
                console.log("Esta es la respuesta=" + usu["CLIENTES_RAZSOCIAL"]);
                if (usu["CLIENTES_EMAIL"] == _this.myForm.value.email) {
                    _this.variablesglobales.logged = true;
                    _this.variablesglobales.setusername(_this.variablesglobales.username);
                    _this.variablesglobales.setusermail(_this.variablesglobales.emailactivo);
                    _this.variablesglobales.CLIENTES_RAZSOCIAL = _this.variablesglobales.username;
                    _this.storage.set('email', '');
                    _this.storage.set('usuario', '');
                    _this.storage.set('pass', '');
                    // set a key/value
                    _this.storage.set('email', _this.myForm.value.email);
                    _this.storage.set('usuario', _this.variablesglobales.username);
                    _this.storage.set('pass', _this.myForm.value.contrasena);
                    var toast = _this.toastCtrl.create({
                        position: "bottom",
                        message: 'Usuario identificado con éxito.',
                        duration: 2000
                    });
                    toast.present();
                    _this.variablesglobales.emailactivo = _this.myForm.value.email;
                    //CARGA LAS UNIDADES DE LA CESTA
                    _this.servicios.obtenernumerocesta(_this.variablesglobales.emailactivo).then(function (data) {
                        _this.datoscargados5 = data;
                        for (var _i = 0, _a = _this.datoscargados5; _i < _a.length; _i++) {
                            var dat = _a[_i];
                            console.log("Obtiene valorDATA = " + dat["valor"]);
                            _this.valorcesta = dat["valor"];
                            _this.variablesglobales.setValorcesta(dat["valor"]);
                            _this.valorcesta = _this.variablesglobales.getValorcesta();
                        }
                    });
                }
                else {
                    console.log("RAZSOCIAL:" + usu["CLIENTES_RAZSOCIAL"]);
                    console.log("EXISTE:" + usu["CLIENTES_EXISTE"]);
                    console.log("ACTIVADO:" + usu["CLIENTES_ACTIVADO"]);
                    if (usu["CLIENTES_EXISTE"] == "NO") {
                        alert("El correo no existe en nuestra base de datos. Verifique que es correcto e intendelo de nuevo.");
                    }
                    else {
                        alert("La contraseña no es correcta.");
                    }
                    setTimeout(function () {
                        document.getElementById("demo").innerHTML = "";
                    }.bind(_this), 2500);
                }
            } //fin del for
        });
    };
    AreaclientePage.prototype.getSelect = function () {
        var _this = this;
        this.servicios.setSelect(this.variablesglobales.emailactivo)
            .then(function (data) {
            _this.usuariodatos = JSON.stringify(data);
            _this.usuariodatosarray = _this.usuariodatos.split('"');
            _this.variablesglobales.CLIENTES_CONTACTO = _this.usuariodatosarray[7];
            _this.variablesglobales.CLIENTES_RAZSOCIAL = _this.usuariodatosarray[11];
            _this.variablesglobales.CLIENTES_CONTRASENA = _this.usuariodatosarray[19];
            _this.variablesglobales.CLIENTES_TELEFONO1 = _this.usuariodatosarray[23];
            _this.variablesglobales.CLIENTES_DIRECCION = _this.usuariodatosarray[27];
            _this.variablesglobales.CLIENTES_POBLACION = _this.usuariodatosarray[31];
            _this.variablesglobales.CLIENTES_PROVINCIA = _this.usuariodatosarray[35];
            _this.variablesglobales.CLIENTES_CPOSTAL = _this.usuariodatosarray[39];
            _this.variablesglobales.CLIENTES_NIF = _this.usuariodatosarray[43];
            _this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = _this.usuariodatosarray['entrega'];
            console.log("CLIENTES_CONTACTO = " + _this.usuariodatosarray[7]); // CLIENTES_CONTACTO
            console.log("CLIENTES_RAZSOCIAL = " + _this.usuariodatosarray[11]); // CLIENTES_RAZSOCIAL
            console.log("CLIENTES_EMAIL = " + _this.usuariodatosarray[15]); // CLIENTES_EMAIL
            console.log("CLIENTES_CONTRASENA = " + _this.usuariodatosarray[19]); // CLIENTES_CONTRASENA
            console.log("CLIENTES_TELEFONO = " + _this.usuariodatosarray[23]); // CLIENTES_TELEFONO1
            console.log("CLIENTES_DIRECCION = " + _this.usuariodatosarray[27]); // CLIENTES_DIRECCION
            console.log("CLIENTES_POBLACION = " + _this.usuariodatosarray[31]); // CLIENTES_POBLACION
            console.log("CLIENTES_PROVINCIA = " + _this.usuariodatosarray[35]); // CLIENTES_PROVINCIA
            console.log("CLIENTES_CPOSTAL = " + _this.usuariodatosarray[39]); // CLIENTES_CPOSTAL
            console.log("CLIENTES_NIF = " + _this.usuariodatosarray[43]); // CLIENTES_NIF
            console.log("CLIENTES_DIRECCION_ENTREGA = " + _this.usuariodatosarray['entrega']); // entrega
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    AreaclientePage.prototype.openBuscar2 = function () {
        console.log(this.formulario.valor);
        if (this.formulario.valor.length < 3) {
            console.log("Para la busqueda, minimo 3 caracteres");
        }
        else {
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);
        }
    };
    AreaclientePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-areacliente',
            templateUrl: 'areacliente.html',
        }),
        __metadata("design:paramtypes", [Storage,
            NavParams,
            ToastController,
            AppserviciosProvider,
            VariablesGlobalesProvider,
            NavController,
            FormBuilder])
    ], AreaclientePage);
    return AreaclientePage;
}());
export { AreaclientePage };
//# sourceMappingURL=areacliente.js.map