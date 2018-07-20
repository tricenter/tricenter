var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { AlertController } from 'ionic-angular';
var AppserviciosProvider = /** @class */ (function () {
    function AppserviciosProvider(alertCtrl, http, variablesglobales) {
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.variablesglobales = variablesglobales;
        this.AppserviciosProvider = [];
        console.log(' ');
    }
    AppserviciosProvider.prototype.cerrarsesion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cerrar sesión',
            message: '¿Está seguro?',
            cssClass: 'alertCustomCss',
            buttons: [
                {
                    text: 'No',
                    role: 'No',
                    handler: function () {
                        console.log('No hacer nada');
                    }
                }, {
                    text: 'Si',
                    handler: function () {
                        _this.variablesglobales.username = "";
                        _this.variablesglobales.logged = "";
                        _this.variablesglobales.CLIENTES_CONTRASENA = "";
                        _this.variablesglobales.emailactivo = "";
                        console.log('Salir');
                    }
                }
            ]
        });
        alert.present();
    };
    AppserviciosProvider.prototype.gettema = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/tema")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getsubtema = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/subtema/" + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getlistart = function (id2) {
        var _this = this;
        console.log("http://www.tricenter.es/AppCatalogo/listart/" + id2);
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/listart/" + id2)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*
    getBuscar(valor){
        console.log("http://www.tricenter.es/AppCatalogo/buscar/"+valor);
        return new Promise(
            resolve=>{
                this.http.get("http://www.tricenter.es/AppCatalogo/buscar/"+valor)
                .map(res=> res.json())
                .subscribe(
                    data => {
                        resolve(data);
                    },
                    err=>{
                        console.log(err);
                    }
                )
            }
        );
    }
    */
    AppserviciosProvider.prototype.getBuscar2 = function (valor) {
        var _this = this;
        console.log("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/" + valor);
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/" + valor)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getAcceso2 = function (email, contrasena) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/sublogin.php/usuario/" + email + "/" + contrasena)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.addRegistro = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            //console.log("El array DESPUES" + data);
            _this.http.put("http://www.tricenter.es/AppCatalogo/usuario.php/add", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.setSelect = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/usuario.php/sel/" + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.addUpdate = function (data) {
        var _this = this;
        this.prueba = JSON.stringify(data);
        console.log("El data PRIMERO es" + this.prueba);
        return new Promise(function (resolve) {
            //console.log("El array DESPUES" + data);
            _this.http.put("http://www.tricenter.es/AppCatalogo/usuario.php/upd", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
                _this.prueba = JSON.stringify(data);
                console.log("El data DEVUELTO es" + _this.prueba);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.addCesta = function (codigo, fecha, unidades, email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/add/" + codigo + "/" + fecha + "/" + unidades + "/" + email)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.obtenernumerocesta = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/obtener/" + email)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertController,
            Http,
            VariablesGlobalesProvider])
    ], AppserviciosProvider);
    return AppserviciosProvider;
}());
export { AppserviciosProvider };
//# sourceMappingURL=appservicios.js.map