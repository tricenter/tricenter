var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { Component } from '@angular/core';
//import { ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
var VariablesGlobalesProvider = /** @class */ (function () {
    function VariablesGlobalesProvider(http
    //private changeDetector: ChangeDetectorRef
    ) {
        this.http = http;
        this.lupa = false;
        this.tema = "";
        this.imagentema = "";
        this.subtema = "";
        this.lisart = "";
        this.logged = "";
        this.username = "";
        this.emailactivo = "";
        this.CLIENTES_CONTACTO = "";
        this.CLIENTES_RAZSOCIAL = "";
        this.CLIENTES_CONTRASENA = "";
        this.CLIENTES_TELEFONO1 = "";
        this.CLIENTES_DIRECCION = "";
        this.CLIENTES_POBLACION = "";
        this.CLIENTES_PROVINCIA = "";
        this.CLIENTES_CPOSTAL = "";
        this.CLIENTES_NIF = "";
        this.CLIENTES_EMAIL = "";
        this.CLIENTES_DIRECCION_ENTREGA = "";
        this.CLIENTES_CUPON = "";
        //var usuarioregistroarray = {};
    }
    VariablesGlobalesProvider.prototype.setRegistro = function (value) {
        this.usuarioregistroarray = value;
    };
    VariablesGlobalesProvider.prototype.getRegistro = function () {
        return this.usuarioregistroarray;
    };
    VariablesGlobalesProvider.prototype.setValorcesta = function (value) {
        this.valorcesta = value;
    };
    VariablesGlobalesProvider.prototype.getValorcesta = function () {
        return this.valorcesta;
    };
    VariablesGlobalesProvider.prototype.setUpdate = function (value) {
        this.usuarioregistroarray = value;
        this.CLIENTES_CONTACTO = this.usuarioregistroarray["nombre"];
        this.CLIENTES_RAZSOCIAL = this.usuarioregistroarray["razsocial"];
        this.CLIENTES_CONTRASENA = this.usuarioregistroarray["contrasena"];
        this.CLIENTES_TELEFONO1 = this.usuarioregistroarray["telefono"];
        this.CLIENTES_DIRECCION = this.usuarioregistroarray["direccion"];
        this.CLIENTES_POBLACION = this.usuarioregistroarray["poblacion"];
        this.CLIENTES_PROVINCIA = this.usuarioregistroarray["provincia"];
        this.CLIENTES_CPOSTAL = this.usuarioregistroarray["cpostal"];
        this.CLIENTES_NIF = this.usuarioregistroarray["nif"];
        this.CLIENTES_DIRECCION_ENTREGA = this.usuarioregistroarray["entrega"];
        this.CLIENTES_EMAIL = this.emailactivo;
    };
    VariablesGlobalesProvider.prototype.getUpdate = function () {
        return this.usuarioregistroarray;
    };
    VariablesGlobalesProvider.prototype.setLogged = function (value) {
        this.logged = value;
    };
    VariablesGlobalesProvider.prototype.getLogged = function () {
        return this.logged;
    };
    VariablesGlobalesProvider.prototype.setusername = function (value) {
        this.username = value;
    };
    VariablesGlobalesProvider.prototype.getusername = function () {
        return this.username;
    };
    VariablesGlobalesProvider.prototype.setusermail = function (value) {
        this.emailactivo = value;
    };
    VariablesGlobalesProvider.prototype.getusermail = function () {
        return this.emailactivo;
    };
    VariablesGlobalesProvider.prototype.settema = function (value) {
        this.tema = value;
    };
    VariablesGlobalesProvider.prototype.gettema = function () {
        return this.tema;
    };
    VariablesGlobalesProvider.prototype.setimagentema = function (value) {
        this.imagentema = value;
    };
    VariablesGlobalesProvider.prototype.getimagentema = function () {
        return this.imagentema;
    };
    VariablesGlobalesProvider.prototype.setLower = function (value) {
        this.lower = value;
    };
    VariablesGlobalesProvider.prototype.setUpper = function (value) {
        this.upper = value;
    };
    VariablesGlobalesProvider.prototype.setBuscar = function (value) {
        this.buscar = value;
    };
    VariablesGlobalesProvider.prototype.getBuscar = function () {
        return this.buscar;
    };
    VariablesGlobalesProvider.prototype.setBuscar2 = function (value) {
        this.buscar2 = value;
    };
    VariablesGlobalesProvider.prototype.getBuscar2 = function () {
        return this.buscar2;
    };
    VariablesGlobalesProvider.prototype.setsubtema = function (value) {
        this.subtema = value;
    };
    VariablesGlobalesProvider.prototype.getsubtema = function () {
        return this.subtema;
    };
    VariablesGlobalesProvider.prototype.setlisart = function (value) {
        this.lisart = value;
    };
    VariablesGlobalesProvider.prototype.getlisart = function () {
        return this.lisart;
    };
    VariablesGlobalesProvider.prototype.rellenaconceros = function (number, width) {
        var numberOutput = Math.abs(number); /* Valor absoluto del número */
        var length = number.toString().length; /* Largo del número */
        var zero = "0"; /* String de cero */
        if (width <= length) {
            if (number < 0) {
                return ("-" + numberOutput.toString());
            }
            else {
                return numberOutput.toString();
            }
        }
        else {
            if (number < 0) {
                return ("-" + (zero.repeat(width - length)) + numberOutput.toString());
            }
            else {
                return ((zero.repeat(width - length)) + numberOutput.toString());
            }
        }
    };
    VariablesGlobalesProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http
            //private changeDetector: ChangeDetectorRef
        ])
    ], VariablesGlobalesProvider);
    return VariablesGlobalesProvider;
}());
export { VariablesGlobalesProvider };
//# sourceMappingURL=variablesglobales.js.map