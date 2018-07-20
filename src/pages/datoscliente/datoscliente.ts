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

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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

@IonicPage()
@Component({
  selector: 'page-datoscliente',
  templateUrl: 'datoscliente.html',
})

export class DatosclientePage {

  myForm: FormGroup;
  arttemas;
  artsubtemas;
  usuariodatos;
  id;
  subtema;
  usuarioacceso;
  
  pages: Array<{title: string, component: any}>;
  usuarioaccesoarray: Array<{usuarioacceso: string}>;
  usuariodatosarray: Array<{usuariodatos: string}>;

 formulario =  {valor: ''}

ionViewDidLoad() { console.log('Estas en DatosCliente'); }

  constructor(
  public navParams: NavParams,
  public servicios:AppserviciosProvider,
  private toastCtrl: ToastController,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public fb: FormBuilder
  ) {

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
  openInicio() {
    this.navCtrl.push(HomePage);
  }

  openCatalogo(){
    this.navCtrl.push(DatosPage);
  }

  openAreacliente(){
    this.navCtrl.push(AreaclientePage);
  }

  openAltausuario(){
    this.navCtrl.push(AltausuarioPage);
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

  openBuscar2() { 
    console.log(this.formulario.valor);
      if(this.formulario.valor.length < 3){
         console.log("Para la busqueda, minimo 3 caracteres");
       } else {
        this.variablesglobales.setBuscar2(this.formulario.valor);
        this.navCtrl.push(BuscarPage);
      }
  }

  acceso() {   
    this.servicios.getAcceso2(this.myForm.value.email, this.myForm.value.contrasena).then(
     data => {
        //this.datosacceso = data;
        var usuarioacceso2;
        
        usuarioacceso2 = data;
        this.usuarioaccesoarray = this.usuarioacceso.split('"')

        for (let usu of usuarioacceso2) {

            this.variablesglobales.username = usu["CLIENTES_RAZSOCIAL"];
            this.variablesglobales.emailactivo = usu["CLIENTES_EMAIL"];

        }

        this.variablesglobales.setusername(this.variablesglobales.username);
        this.variablesglobales.setusermail(this.variablesglobales.emailactivo);   

        const toast = this.toastCtrl.create({
          position: "bottom",
          message: 'Usuario identificado con éxito.',
          duration: 3000
        });

        toast.present();
        
        this.variablesglobales.logged = true;
        this.getSelect();
      })
  }


getSelect(){    
  this.servicios.setSelect(this.variablesglobales.emailactivo)
    .then(
        data => {
        this.usuariodatos = data;

        for (let usu2 of this.usuariodatos) {

          console.log("El valor que falla :" + usu2["CLIENTES_NIF"]);

          this.variablesglobales.CLIENTES_CONTACTO = usu2["CLIENTES_RAZSOCIAL"]; 
          this.variablesglobales.CLIENTES_RAZSOCIAL = usu2["CLIENTES_RAZSOCIAL"];   
          this.variablesglobales.CLIENTES_CONTRASENA = usu2["CLIENTES_CONTRASENA"];   
          this.variablesglobales.CLIENTES_EMAIL = usu2["CLIENTES_EMAIL"]; 
          this.variablesglobales.CLIENTES_TELEFONO1 = usu2["CLIENTES_TELEFONO1"]; 
          this.variablesglobales.CLIENTES_DIRECCION = usu2["CLIENTES_DIRECCION"];   
          this.variablesglobales.CLIENTES_POBLACION = usu2["CLIENTES_POBLACION"];   
          this.variablesglobales.CLIENTES_PROVINCIA = usu2["CLIENTES_PROVINCIA"];   
          this.variablesglobales.CLIENTES_CPOSTAL = usu2["CLIENTES_CPOSTAL"];   
          this.variablesglobales.CLIENTES_NIF = usu2["CLIENTES_NIF"];  
          this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = usu2["CLIENTES_DIRECCION_ENTREGA"];  

         }

      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
}


   update() {  
      this.variablesglobales.usuarioregistroarray = {} ;

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

       const toast = this.toastCtrl.create({
        position: "bottom",
        message: 'Datos actualizados correctamente.',
        duration: 2000
      });
      toast.present();
  }

}