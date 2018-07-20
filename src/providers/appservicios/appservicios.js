var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
//import { ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';
var AppserviciosProvider = /** @class */ (function () {
    function AppserviciosProvider(appCtrl, alertCtrl, changeDetector, http, variablesglobales, storage) {
        this.appCtrl = appCtrl;
        this.alertCtrl = alertCtrl;
        this.changeDetector = changeDetector;
        this.http = http;
        this.variablesglobales = variablesglobales;
        this.storage = storage;
        this.AppserviciosProvider = [];
        this.items = [];
        this.itemsInCart = [];
        this.cartBadgeState = 'idle';
        console.log(' ');
        this.items = [
            { title: 'Something', quantityInCart: 0, addButtonState: 'idle' }
        ];
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
                    handler: function () { console.log('No hacer nada'); }
                }, {
                    text: 'Si',
                    handler: function () {
                        _this.variablesglobales.username = "";
                        _this.variablesglobales.logged = false;
                        _this.variablesglobales.CLIENTES_CONTRASENA = "";
                        _this.variablesglobales.emailactivo = "";
                        _this.storage.set('email', '');
                        _this.storage.set('usuario', '');
                        _this.storage.set('pass', '');
                        _this.storage.set('valorabuscar', '');
                        _this.storage.set('orden', '');
                        _this.storage.set('menor', '');
                        _this.storage.set('myor', '');
                        _this.appCtrl.getRootNav().push(HomePage);
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
    AppserviciosProvider.prototype.getMasVendidos = function (valor) {
        var _this = this;
        console.log("http://www.tricenter.es/AppCatalogo/index.php/masvendidos/" + valor);
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/index.php/masvendidos/" + valor)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getBuscar = function (valor) {
        var _this = this;
        console.log("http://www.tricenter.es/AppCatalogo/buscar/" + valor);
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/buscar/" + valor)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getBuscar2 = function (valor, lower, upper) {
        var _this = this;
        this.storage.set('valorabuscar', valor);
        this.storage.set('orden', 'ASC');
        this.storage.set('menor', lower);
        this.storage.set('myor', upper);
        console.log("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/" + valor + "/ARTICULOS_PENDIENTE_ENTREGAR/ASC/" + lower + "/" + upper);
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cuadroDeBusqueda/" + valor + "/ARTICULOS_PENDIENTE_ENTREGAR/ASC/" + lower + "/" + upper)
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
            _this.http.get("http://www.tricenter.es/AppCatalogo/usuario.php/sel/" + id + "/oka")
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
        return new Promise(function (resolve) {
            //console.log("El array DESPUES" + data);
            _this.http.put("http://www.tricenter.es/AppCatalogo/usuario.php/upd", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*----------------------------------------------------------------
    ---------------------------CESTA DE COMPRA------------------------
    ----------------------------------------------------------------*/
    AppserviciosProvider.prototype.cupon = function (codigo) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/cupon/" + codigo)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.delCesta = function (codigo, email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/delarticulo/" + codigo + "/" + email + "/oka")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.eddCesta = function (codigo, fecha, unidades, email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/edd/" + codigo + "/" + fecha + "/" + unidades + "/" + email + "/oka")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.addCesta = function (codigo, fecha, unidades, email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/add/" + codigo + "/" + fecha + "/" + unidades + "/" + email + "/oka")
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
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/obtener/" + email + "/oka")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.editarcesta = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/cesta.php/editar/" + email + "/oka")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    /*----------------------------------------------------------------
    ---------------------------FIN DE COMPRA------------------------
    ----------------------------------------------------------------*/
    AppserviciosProvider.prototype.addPedido = function (data) {
        var _this = this;
        console.log("Empieza la grabacion " + data["ped_cod"] + " ");
        return new Promise(function (resolve) {
            _this.http.put("http://www.tricenter.es/AppCatalogo/pedidos.php/grabarpedido", data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider.prototype.getpedidosanteriores = function (email) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get("http://www.tricenter.es/AppCatalogo/pedidos.php/editarcab/" + email + "/oka")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    AppserviciosProvider = __decorate([
        Component({
            animations: [
                trigger('cartBadge', [
                    state('idle', style({
                        opacity: '1',
                        transform: 'scale(1)'
                    })),
                    state('adding', style({
                        opacity: '1',
                        transform: 'scale(1)'
                    })),
                    transition('idle <=> adding', animate(750, keyframes([
                        style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                        style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                    ]))),
                ]),
                trigger('addButton', [
                    state('idle', style({
                        opacity: '1'
                    })),
                    state('adding', style({
                        opacity: '1',
                        fontWeight: 'bold'
                    })),
                    transition('idle <=> adding', animate('300ms linear')),
                    transition('void => *', [
                        style({ transform: 'translateX(200%)' }),
                        animate('300ms ease-in-out')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [App,
            AlertController,
            ChangeDetectorRef,
            Http,
            VariablesGlobalesProvider,
            Storage])
    ], AppserviciosProvider);
    return AppserviciosProvider;
}());
export { AppserviciosProvider };
//# sourceMappingURL=appservicios.js.map