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
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import { DatosPage } from '../../pages/datos/datos';
import { PagoPage } from '../../pages/pago/pago';
import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { PiboPage } from '../../pages/pibo/pibo';
import { PisaPage } from '../../pages/pisa/pisa';
import { MairenaPage } from '../../pages/mairena/mairena';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the CestaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CestaPage = /** @class */ (function () {
    function CestaPage(payPal, alertCtrl, navCtrl, navParams, variablesglobales, servicios, fb) {
        this.payPal = payPal;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.variablesglobales = variablesglobales;
        this.servicios = servicios;
        this.fb = fb;
        this.arr_pedido = new Array();
        //public arr_pedido = new Array();
        this.valortotal = 0;
        this.payment = new PayPalPayment('0.51', 'EUR', 'Pago por PayPal a Tricenter', 'sale');
        this.currencies = ['EUR', 'USD'];
        this.payPalEnvironment = 'payPalEnvironmentSandbox';
        this.notifications = 'mute_1';
        this.rating = 1;
        this.ocultar1 = false;
        this.ocultar2 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultartodos = false;
        this.appType = 'Paid';
        this.safari = 'Shared Links';
        this.weather = 'sunny';
        this.getSelect();
        this.loaddata();
    }
    CestaPage.prototype.loaddata = function () {
        var _this = this;
        this.myFact = this.fb.group({
            razsocial: [''],
            direccion: [''],
            nif: ['']
        });
        this.myForm = this.fb.group({
            unidades: ['', [Validators.required, Validators.pattern(/^[0-9_-]{1,4}$/)]]
        });
        this.myCupon = this.fb.group({
            txtcupon: [''],
            txtcupon2: ['']
        });
        this.servicios.editarcesta(this.variablesglobales.emailactivo)
            .then(function (data) {
            _this.rs_cesta = data;
            _this.valortotal = 0;
            for (var _i = 0; _i < _this.rs_cesta.length; _i++) {
                _this.valortotal = _this.valortotal + (_this.rs_cesta[_i].CESTA_PVP_IVA * _this.rs_cesta[_i].CESTA_UNIDADES);
            }
            if (_this.rating == 1) {
                console.log("ValorA" + _this.valortotal.toFixed(2) + "  --> 6 ");
                _this.valortransporte = "6.00";
            }
            if (_this.rating == 2) {
                console.log("ValorB" + _this.valortotal.toFixed(2) + "  --> 9 ");
                _this.valortransporte = "9.00";
            }
            if (_this.rating == 3) {
                _this.valortransporte = 0;
            }
            if (_this.rating == 4) {
                _this.valortransporte = 0;
            }
            if (_this.rating == 5) {
                _this.valortransporte = 0;
            }
            if (_this.variablesglobales.CLIENTES_CUPON != 0) {
                _this.valorcupon = _this.valortotal - _this.variablesglobales.CLIENTES_CUPON;
            }
            _this.valorterminado = (_this.valortotal + parseFloat(_this.valortransporte) - _this.variablesglobales.CLIENTES_CUPON).toFixed(2);
            _this.valortotal = parseFloat(_this.valortotal.toFixed(2));
            console.log("Suma=" + _this.valortotal);
            console.log("Mensajeria=" + _this.valortransporte);
            console.log("CUPON=" + _this.variablesglobales.CLIENTES_CUPON);
        })
            .catch(function (error) {
            console.log(error);
        });
        // ACTUALIZA EL NUMERO DE LA CESTA
        this.servicios.obtenernumerocesta(this.variablesglobales.emailactivo).then(function (data) {
            _this.datoscargados5 = data;
            for (var _a = 0, _b = _this.datoscargados5; _a < _b.length; _a++) {
                var dat = _b[_a];
                console.log("Obtiene valorDATA = " + dat["valor"]);
                _this.valorcesta = dat["valor"];
                _this.variablesglobales.setValorcesta(dat["valor"]);
                _this.valorcesta = _this.variablesglobales.getValorcesta();
            }
        });
        // FIN ACTUALIZA EL NUMERO DE LA CESTA
    };
    CestaPage.prototype.getSelect = function () {
        var _this = this;
        this.servicios.setSelect(this.variablesglobales.emailactivo)
            .then(function (data) {
            var usuariodat;
            usuariodat = data;
            for (var _a = 0, usuariodat_1 = usuariodat; _a < usuariodat_1.length; _a++) {
                var usu3 = usuariodat_1[_a];
                _this.variablesglobales.CLIENTES_CONTACTO = usu3["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.CLIENTES_RAZSOCIAL = usu3["CLIENTES_RAZSOCIAL"];
                _this.variablesglobales.CLIENTES_CONTRASENA = usu3["CLIENTES_CONTRASENA"];
                _this.variablesglobales.CLIENTES_EMAIL = usu3["CLIENTES_EMAIL"];
                _this.variablesglobales.CLIENTES_TELEFONO1 = usu3["CLIENTES_TELEFONO1"];
                _this.variablesglobales.CLIENTES_DIRECCION = usu3["CLIENTES_DIRECCION"];
                _this.variablesglobales.CLIENTES_POBLACION = usu3["CLIENTES_POBLACION"];
                _this.variablesglobales.CLIENTES_PROVINCIA = usu3["CLIENTES_PROVINCIA"];
                _this.variablesglobales.CLIENTES_CPOSTAL = usu3["CLIENTES_CPOSTAL"];
                _this.variablesglobales.CLIENTES_NIF = usu3["CLIENTES_NIF"];
                _this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = usu3["CLIENTES_DIRECCION_ENTREGA"];
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    CestaPage.prototype.mostrar_des = function (cadena) {
        var pos;
        this.cadena_des = cadena;
        pos = cadena.indexOf(" ");
        this.cadena_des = cadena.substring(0, pos + 1);
        cadena = cadena.substring(pos + 1);
        pos = cadena.indexOf(" ");
        this.cadena_des = this.cadena_des + cadena.substring(0, pos + 1);
        cadena = cadena.substring(pos + 1);
        pos = cadena.indexOf(" ");
        this.cadena_des = this.cadena_des + cadena.substring(0, pos + 1);
        //  this.cadena_des = this.cadena_des + cadena;
        return this.cadena_des + "...";
    };
    CestaPage.prototype.quitardelacesta = function (codigo) {
        var _this = this;
        var mensaje;
        mensaje = "¿Confirma quitarlo de la cesta?<br><br>" + "Código:" + codigo.CESTA_CODIGO + "<br>" + codigo.CESTA_DESNORMAL;
        var alert = this.alertCtrl.create({
            title: 'Cesta',
            message: mensaje,
            cssClass: 'alertCustomCss',
            buttons: [
                {
                    text: 'No',
                    role: 'No',
                    handler: function () { console.log('No hacer nada'); }
                }, {
                    text: 'Si',
                    handler: function () {
                        _this.servicios.delCesta(codigo.CESTA_CODIGO, _this.variablesglobales.emailactivo);
                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                    }
                }
            ]
        });
        alert.present();
    };
    CestaPage.prototype.editunicesta = function (codigo) {
        var _this = this;
        var mensaje;
        mensaje = "¿Confirma actualizar las unidades del artículo?<br><br>" + "Código:" + codigo.CESTA_CODIGO + "<br>" + codigo.CESTA_DESNORMAL + "<br>" + this.myForm.value.unidades;
        var alert = this.alertCtrl.create({
            title: 'Cesta',
            message: mensaje,
            cssClass: 'alertCustomCss',
            buttons: [
                {
                    text: 'No',
                    role: 'No',
                    handler: function () { console.log('No hacer nada'); }
                }, {
                    text: 'Si',
                    handler: function () {
                        //this.servicios.delCesta(codigo.CESTA_CODIGO,this.variablesglobales.emailactivo);
                        _this.servicios.eddCesta(codigo.CESTA_CODIGO, "99999", _this.myForm.value.unidades, _this.variablesglobales.emailactivo);
                        //this.servicios.eddCesta(codigo.CESTA_CODIGO,  "99999", this.myForm.value.unidades, this.variablesglobales.emailactivo);
                        _this.navCtrl.setRoot(_this.navCtrl.getActive().component);
                    }
                }
            ]
        });
        alert.present();
    };
    CestaPage.prototype.openPago = function () {
        this.navCtrl.push(PagoPage);
    };
    CestaPage.prototype.accion1 = function () {
        this.ocultar2 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultar1 = !this.ocultar1;
    };
    CestaPage.prototype.accion2 = function () {
        this.ocultar1 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultar2 = !this.ocultar2;
    };
    CestaPage.prototype.accion3 = function () {
        this.ocultar1 = false;
        this.ocultar2 = false;
        this.ocultar4 = false;
        this.ocultar5 = false;
        this.ocultar3 = !this.ocultar3;
    };
    CestaPage.prototype.accion4 = function () {
        this.ocultar1 = false;
        this.ocultar2 = false;
        this.ocultar3 = false;
        this.ocultar5 = false;
        this.ocultar4 = !this.ocultar4;
    };
    CestaPage.prototype.accion5 = function () {
        this.ocultar1 = false;
        this.ocultar2 = false;
        this.ocultar3 = false;
        this.ocultar4 = false;
        this.ocultar5 = !this.ocultar5;
    };
    CestaPage.prototype.checkActiveButton = function () {
        if (this.ocultar1 && this.ocultar2 && this.ocultar3 && this.ocultar4 && this.ocultar5) {
            this.ocultartodos = true;
        }
        else if (!this.ocultar1 && !this.ocultar2 && !this.ocultar3 && !this.ocultar4 && !this.ocultar5) {
            this.ocultartodos = false;
        }
    };
    CestaPage.prototype.acciontodos = function () {
        if (this.ocultartodos === false) {
            this.ocultar1 = true;
            this.ocultar2 = true;
            this.ocultar3 = true;
            this.ocultar4 = true;
            this.ocultar5 = true;
        }
        else {
            this.ocultar1 = false;
            this.ocultar2 = false;
            this.ocultar3 = false;
            this.ocultar4 = false;
            this.ocultar5 = false;
        }
        this.ocultartodos = !this.ocultartodos;
    };
    CestaPage.prototype.iradatos = function () {
        this.navCtrl.push(DatosclientePage);
    };
    CestaPage.prototype.openPibo = function () {
        this.navCtrl.push(PiboPage);
    };
    CestaPage.prototype.openPisa = function () {
        this.navCtrl.push(PisaPage);
    };
    CestaPage.prototype.openMairena = function () {
        this.navCtrl.push(MairenaPage);
    };
    CestaPage.prototype.makePayment = function () {
    };
    CestaPage.prototype.pagar = function () {
        var _this = this;
        var payment = new PayPalPayment(this.valorterminado.toString(), 'EUR', 'Pago del pedido', 'sale');
        var clientIDs = {
            "PayPalEnvironmentProduction": "Ab7USSkli1xVz4Pa48S16akUtALf8kt7OOePt3QdMCfIz3JqcaBLaQDHIdpt2ZRS80z00g-NXFyv795G",
            "PayPalEnvironmentSandbox": "ATHY9aVPlbgXKQ_ow-pxxn8phgRHcIRvhsN09L2E4GoFDWWD5eVmUfF4HsQhjhkOJwNrKs-YFp5rf0r5",
            "payPalEnv": 'PayPalEnvironmentSandbox',
            "payPalShopName": 'tricenter',
            "paypalLanguageOrLocale": 'sp_SP'
        };
        this.payPal.init(clientIDs).then(function () {
            //Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
            // Only needed if you get an "Internal Service Error" after PayPal login!
            //PalShippingAddressOption: 2 
            //PalShippingAddressOptionPayPal
            })).then(function () {
                //  let payment = new PayPalPayment("10", 'EUR', "Opv", 'sale');
                // this.payPal.renderSinglePaymentUI(payment).then(() => {
                _this.payPal.renderSinglePaymentUI(payment).then(function (data) {
                    _this.dataPaypal = JSON.stringify(data);
                    _this.dataPaypal = _this.dataPaypal.split('"');
                    if (data.response.state == "approved") {
                        //------------------------------------------
                        /* EL PAGO SE HA REALIZADO CORRECTAMENTE */
                        var mensaje;
                        mensaje = "Correcto.<br>El pago se ha realizado correctamente.<br><br>Su pedido se acaba de poner en marcha.<br>Podrá consultar el estado del mismo en el menu principal.<br>Gracias por confiar en nosotros.<br>El equipo de Tricenter.";
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Pedido',
                            message: mensaje,
                            cssClass: 'alertCustomCss',
                            buttons: [
                                {
                                    text: 'Aceptar',
                                    role: 'No',
                                    handler: function () {
                                        _this.grabarpedido();
                                    }
                                }
                            ]
                        });
                        alert_1.present();
                    }
                    else {
                        alert("error" + data.response.state);
                    }
                    // SI EL PAGO SE HACE CORRECTAMENTE, EL MENSAJE QUE LE APARECE AL CLIENTE ES ALGO PARECIDO A ESTO
                    // {  "client": {
                    //     "environment": "sandbox",
                    //     "product_name": "PayPal iOS SDK",
                    //     "paypal_sdk_version": "2.16.0",
                    //     "platform": "iOS"
                    //   },
                    //   "response_type": "payment",
                    //   "response": {
                    //     "id": "PAY-1AB23456CD789012EF34GHIJ",
                    //     "state": "approved",
                    //     "create_time": "2016-10-03T13:33:33Z",
                    //     "intent": "sale"
                    //   }
                    // }
                }, function (erro) {
                    // Error or render dialog closed without being successful
                });
            }, function (erro) {
            });
        }, function (erro) {
            //alert("Fallo lógico=" + erro
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    }; //FIN PAGO ()
    CestaPage.prototype.grabarpedido = function () {
        var arr_pedido = {};
        //var arr_pedido = new Array();
        var fecha = new Date();
        var ped_cod = fecha.getFullYear().toString() + (this.variablesglobales.rellenaconceros(fecha.getMonth() + 1, 2) + this.variablesglobales.rellenaconceros(fecha.getDate(), 2) + this.variablesglobales.rellenaconceros(fecha.getHours(), 2) + this.variablesglobales.rellenaconceros(fecha.getMinutes(), 2));
        for (var _i = 0; _i < this.rs_cesta.length; _i++) {
            console.log("El valor de i es =" + _i);
            //arr_pedido[_i]=new Array(18);
            arr_pedido["ped_orden"] = _i;
            arr_pedido["ped_cod"] = ped_cod;
            arr_pedido["ped_email"] = this.variablesglobales.emailactivo;
            arr_pedido["ped_fecha"] = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
            arr_pedido["ped_hora"] = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();
            arr_pedido["ped_razsocial"] = this.variablesglobales.CLIENTES_RAZSOCIAL;
            arr_pedido["ped_nif"] = this.variablesglobales.CLIENTES_NIF;
            arr_pedido["ped_direccion"] = this.variablesglobales.CLIENTES_DIRECCION;
            arr_pedido["ped_poblacion"] = this.variablesglobales.CLIENTES_POBLACION;
            arr_pedido["ped_provincia"] = this.variablesglobales.CLIENTES_PROVINCIA;
            arr_pedido["ped_telefono"] = this.variablesglobales.CLIENTES_TELEFONO1;
            arr_pedido["ped_direccion_entrega"] = this.variablesglobales.CLIENTES_DIRECCION_ENTREGA;
            arr_pedido["ped_codigo_articulo"] = this.rs_cesta[_i].CESTA_CODIGO;
            arr_pedido["ped_desnormal"] = this.rs_cesta[_i].CESTA_DESNORMAL;
            arr_pedido["ped_uni"] = this.rs_cesta[_i].CESTA_UNIDADES;
            arr_pedido["ped_pvp"] = this.rs_cesta[_i].CESTA_PVP_IVA;
            switch (this.rating) {
                case 1:
                    arr_pedido["ped_mensajeria_texto"] = "(" + this.rating + ")" + " Mensajería Normal";
                    break;
                case 2:
                    arr_pedido["ped_mensajeria_texto"] = "(" + this.rating + ")" + " Mensajería Express";
                    break;
                case 3:
                    arr_pedido["ped_mensajeria_texto"] = "(" + this.rating + ")" + " Se Recoge en la tienda del PISA";
                    break;
                case 4:
                    arr_pedido["ped_mensajeria_texto"] = "(" + this.rating + ")" + " Se recoge en la tienda del PIBO";
                    break;
                case 5:
                    arr_pedido["ped_mensajeria_texto"] = "(" + this.rating + ")" + " Se recoge en la tienda del Nuevo Bulevar";
                    break;
            }
            arr_pedido["ped_imagen"] = this.rs_cesta[_i].CESTA_IMAGEN;
            arr_pedido["ped_mensajeria"] = this.valortransporte;
            arr_pedido["ped_cupon"] = this.variablesglobales.CLIENTES_CUPON;
            arr_pedido["ped_importe_total"] = this.valorterminado.toString();
            arr_pedido["ped_estado"] = "Pagado, pendiente de entregar";
            this.servicios.addPedido(arr_pedido).then(function (data) {
                console.log("El data DEVUELTO es" + JSON.stringify(data));
            });
        }
        this.servicios.delCesta("todo", this.variablesglobales.emailactivo);
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    };
    CestaPage.prototype.obtenercupon = function () {
        var _this = this;
        this.servicios.cupon(this.myCupon.value.txtcupon)
            .then(function (data) {
            var cuponn;
            cuponn = data;
            for (var _a = 0, cuponn_1 = cuponn; _a < cuponn_1.length; _a++) {
                var cupo = cuponn_1[_a];
                _this.valorcupon = cupo["valor"];
                break;
            }
            console.log('No hacer nada-->' + _this.variablesglobales.CLIENTES_CUPON);
            if (_this.variablesglobales.CLIENTES_CUPON == 0) {
                var mensaje;
                mensaje = "Se ha encontrado un cupón de descuento.<br><br>Descuento de -" + _this.valorcupon;
                var alert_2 = _this.alertCtrl.create({
                    title: 'Cesta',
                    message: mensaje,
                    cssClass: 'alertCustomCss',
                    buttons: [
                        {
                            text: 'Aplicar descuento',
                            role: 'No',
                            handler: function () {
                                _this.variablesglobales.CLIENTES_CUPON = _this.valorcupon;
                                _this.valorterminado = _this.valorterminado - _this.valorcupon;
                                console.log("Valor del cupon apliocad=" + _this.variablesglobales.CLIENTES_CUPON);
                            }
                        }
                    ]
                });
                alert_2.present();
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    CestaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-cesta',
            templateUrl: 'cesta.html',
        }),
        __metadata("design:paramtypes", [PayPal,
            AlertController,
            NavController,
            NavParams,
            VariablesGlobalesProvider,
            AppserviciosProvider,
            FormBuilder])
    ], CestaPage);
    return CestaPage;
}());
export { CestaPage };
/*

Card Type: Visa

Card Number: 4654 2683 6853 5161

Expiration Date: 03/2028

CVV: 900

*/ 
//# sourceMappingURL=cesta.js.map