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

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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


@IonicPage()
@Component({
  selector: 'page-altausuario',
  templateUrl: 'altausuario.html',
})

export class AltausuarioPage {

  myForm: FormGroup;

  nuevadireccion:string = "";
  arttemas;
  artsubtemas;
  email;
  password;
  datosacceso;
  usuarioacceso;
  data;
  id;
  subtema;
  
  pages: Array<{title: string, component: any}>;
  usuarioaccesoarray: Array<{usuarioacceso: string}>;

 formulario = { valor: '' }

  constructor(
  public navParams: NavParams,
  public servicios:AppserviciosProvider,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public fb: FormBuilder
  ) {
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

  openInicio() {
    this.navCtrl.push(HomePage);
  }

  openCatalogo(){
    this.navCtrl.push(DatosPage);
  }

  openAreacliente(){
    this.navCtrl.push(AreaclientePage);
  }
  
   openTiendas(){
      this.navCtrl.push(TiendasPage);
  }

  loadData(){
		this.servicios.gettema()
	  .then(
	    data => {
	      this.arttemas = data;
	    }
	  )
	  .catch(
	    error => {
	      console.log(error);
	    }
	  )
	}

  registro() {  
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
        alert(`Por favor compruebe su bandeja de entrada en ${this.myForm.value.email}`);
    }
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
  openBuscar2() { 
    console.log(this.formulario.valor);
      if(this.formulario.valor.length < 3){
         console.log("Para la busqueda, minimo 3 caracteres");
       } else {
        this.variablesglobales.setBuscar2(this.formulario.valor);
        this.navCtrl.push(BuscarPage);
      }
  }
}
