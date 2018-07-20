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
  selector: 'page-datosacceso',
  templateUrl: 'datosacceso.html',
})

export class DatosaccesoPage {

  myForm: FormGroup;
  arttemas;
  artsubtemas;
  usuariodatos;
  id;
  subtema;
  usuarioacceso;
  datoscargados4;
  valorcesta;
  
  pages: Array<{title: string, component: any}>;
  usuarioaccesoarray: Array<{usuarioacceso: string}>;
  usuariodatosarray: Array<{usuariodatos: string}>;

 formulario = 
 {
  valor: ''
}

  constructor(
  public navParams: NavParams,
  public servicios:AppserviciosProvider,
  private toastCtrl: ToastController,
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
        
        this.usuarioacceso = JSON.stringify(data)
        this.usuarioaccesoarray = this.usuarioacceso.split('"')

        this.variablesglobales.username = this.usuarioaccesoarray[3];
        this.variablesglobales.emailactivo = this.usuarioaccesoarray[15];

        this.variablesglobales.setusername(this.variablesglobales.username);
        this.variablesglobales.setusermail(this.variablesglobales.emailactivo);   

        const toast = this.toastCtrl.create({
          position: "bottom",
          message: 'Usuario identificado con éxito.',
          duration: 3000
        });

        toast.present();

        console.log("Bienvenido " + this.usuarioaccesoarray[3]); // ESTE ES EL NOMBRE
        console.log("Bienvenido " + this.usuarioaccesoarray[15]); // ESTE ES EL EMAIL
        
        this.variablesglobales.logged = true;



     this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
    data => {
     this.datoscargados4 = data;
     for (let dat of this.datoscargados4) {
      console.log("Obtiene valorDATA = " + dat["valor"]);

      this.valorcesta = dat["valor"];

      this.variablesglobales.setValorcesta(dat["valor"]);

      this.valorcesta = this.variablesglobales.getValorcesta();
      }})




        this.getSelect();
      })
  }


 getSelect(){    
   this.servicios.setSelect(this.variablesglobales.emailactivo)
     .then(
        data => {
        this.usuariodatos = JSON.stringify(data)
        this.usuariodatosarray = this.usuariodatos.split('"')

        this.variablesglobales.CLIENTES_CONTACTO = this.usuariodatosarray[7];  
        this.variablesglobales.CLIENTES_RAZSOCIAL = this.usuariodatosarray[11];  
        this.variablesglobales.CLIENTES_CONTRASENA = this.usuariodatosarray[19];  
        this.variablesglobales.CLIENTES_EMAIL = this.usuariodatosarray[31];  
        this.variablesglobales.CLIENTES_TELEFONO1 = this.usuariodatosarray[23];  
        this.variablesglobales.CLIENTES_DIRECCION = this.usuariodatosarray[27];  
        this.variablesglobales.CLIENTES_POBLACION = this.usuariodatosarray[31];  
        this.variablesglobales.CLIENTES_PROVINCIA = this.usuariodatosarray[35];  
        this.variablesglobales.CLIENTES_CPOSTAL = this.usuariodatosarray[39];  
        this.variablesglobales.CLIENTES_NIF = this.usuariodatosarray[43];  

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

      if (this.myForm.value.nombre == "") { this.variablesglobales.usuarioregistroarray["nombre"] = this.variablesglobales.CLIENTES_CONTACTO }
      else { this.variablesglobales.usuarioregistroarray["nombre"] = this.myForm.value.nombre;  }
      
      if (this.myForm.value.razsocial == "") { this.variablesglobales.usuarioregistroarray["razsocial"] = this.variablesglobales.CLIENTES_RAZSOCIAL; }
      else { this.variablesglobales.usuarioregistroarray["razsocial"] = this.myForm.value.razsocial;   }

      if (this.myForm.value.contrasena == "")  { this.variablesglobales.usuarioregistroarray["contrasena"] = this.variablesglobales.CLIENTES_CONTRASENA;   }
      else { this.variablesglobales.usuarioregistroarray["contrasena"] = this.myForm.value.contrasena;       }

      if (this.myForm.value.telefono == "")   {  this.variablesglobales.usuarioregistroarray["telefono"] = this.variablesglobales.CLIENTES_TELEFONO1;   }
      else { this.variablesglobales.usuarioregistroarray["telefono"] = this.myForm.value.telefono;      }

      if (this.myForm.value.direccion == "") { this.variablesglobales.usuarioregistroarray["direccion"] = this.variablesglobales.CLIENTES_DIRECCION;   }
      else { this.variablesglobales.usuarioregistroarray["direccion"] = this.myForm.value.direccion;   }

      if (this.myForm.value.cpostal == "")  { this.variablesglobales.usuarioregistroarray["cpostal"] = this.variablesglobales.CLIENTES_CPOSTAL; }
      else { this.variablesglobales.usuarioregistroarray["cpostal"] = this.myForm.value.cpostal;   }

      if (this.myForm.value.poblacion == "") { this.variablesglobales.usuarioregistroarray["poblacion"] = this.variablesglobales.CLIENTES_POBLACION; }
      else { this.variablesglobales.usuarioregistroarray["poblacion"] = this.myForm.value.poblacion; }

      if (this.myForm.value.provincia == "") { this.variablesglobales.usuarioregistroarray["provincia"] = this.variablesglobales.CLIENTES_PROVINCIA; }
      else { this.variablesglobales.usuarioregistroarray["provincia"] = this.myForm.value.provincia; }

      if (this.myForm.value.nif == "") { this.variablesglobales.usuarioregistroarray["nif"] = this.variablesglobales.CLIENTES_NIF; }
      else { this.variablesglobales.usuarioregistroarray["nif"] = this.myForm.value.nif; }


      this.variablesglobales.usuarioregistroarray["email"] = this.variablesglobales.emailactivo;
      this.servicios.addUpdate(this.variablesglobales.usuarioregistroarray);
      this.variablesglobales.setUpdate(this.variablesglobales.usuarioregistroarray);
      this.variablesglobales.getUpdate();
      this.variablesglobales.logged = true;
  }

}