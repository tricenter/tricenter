//import { Component } from '@angular/core';
//import { ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { AppserviciosProvider } from '../../providers/appservicios/appservicios';

@Injectable()

export class VariablesGlobalesProvider {
	
  public lupa: boolean = false;
  private tema;
  private imagentema;

  private NumeroPedido;
  private HoraPedido;
  private ImportePedido;
  
  private subtema;
  private lisart;
  public logged;
  public username;
  public emailactivo; // no modificable
  public pagina_atras;
  public tema_atras;
  public subtema_atras;
    
  public CLIENTES_CONTACTO;
  public CLIENTES_RAZSOCIAL;
  public CLIENTES_CONTRASENA;
  public CLIENTES_TELEFONO1;
  public CLIENTES_DIRECCION;
  public CLIENTES_POBLACION;
  public CLIENTES_PROVINCIA;
  public CLIENTES_CPOSTAL;
  public CLIENTES_NIF;
  public CLIENTES_EMAIL;
  public CLIENTES_DIRECCION_ENTREGA;
  public CLIENTES_CUPON;

  public usuarioregistroarray;
  public buscar;
  public buscar2;

  public lower;
  public upper;

  public valorcesta;

  constructor(
    public http: Http
    //private changeDetector: ChangeDetectorRef
    )
  { 
    this.tema = "";
    this.imagentema="";
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
    this.NumeroPedido ="";
    this.HoraPedido ="";
    this.ImportePedido ="";

    //var usuarioregistroarray = {};
  }
    
  setNumeroPedido(value){
    this.NumeroPedido = value;
   }
   
   getNumeroPedido(){
    return this.NumeroPedido;
   }

  setFechaPedido(value){
    this.HoraPedido = value;
   }
   
   getFechaPedido(){
    return this.HoraPedido;
   }

  setImportePedido(value){
    this.ImportePedido = value;
   }
   
   getImportePedido(){
    return this.ImportePedido;
   }

   setRegistro(value){
    this.usuarioregistroarray = value;
   }
   
   getRegistro(){
    return this.usuarioregistroarray;
   }


   setValorcesta(value){
    this.valorcesta = value;
   }
   
   getValorcesta(){
    return this.valorcesta;
   }

   setUpdate(value){
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
   }
   
   getUpdate(){
    return this.usuarioregistroarray;
   }

   setLogged(value){
    this.logged = value;
   }
   
   getLogged(){
    return this.logged;
   }
   
   setusername(value){
     this.username = value;
   }

   getusername(){
     return this.username;
   }

   setusermail(value){
      this.emailactivo = value;
   }

    getusermail(){
     return this.emailactivo;
   }

   settema(value){
   	this.tema = value;
   }
   
   gettema(){
   	return this.tema;
   }

   setimagentema(value){
     this.imagentema = value;
   }
   
   getimagentema(){
     return this.imagentema;
   }

  setLower(value){
     this.lower = value;
   }

   setUpper(value){
     this.upper = value;
   }

   setBuscar(value){
     this.buscar = value;
   }

   getBuscar(){
     return this.buscar;
   }

   setBuscar2(value){
     this.buscar2 = value;
   }

   getBuscar2(){
     return this.buscar2;
   }

   setsubtema(value){
   	this.subtema = value;
   }
  
   getsubtema(){
   	return this.subtema;
   }

   setlisart(value){
     this.lisart = value;
   }
   
   getlisart(){
     return this.lisart;
   }

  rellenaconceros(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}


}
