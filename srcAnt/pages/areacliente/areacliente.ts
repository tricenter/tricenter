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

import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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


@IonicPage()
@Component({
  selector: 'page-areacliente',
  templateUrl: 'areacliente.html',
})

export class AreaclientePage {

  myForm: FormGroup;
  arttemas;
  artsubtemas;
  usuariodatos;
  id;
  subtema;
  code;
  email;
  contrasena;
  usuarioacceso;
  datosacceso;
  datoscargados5;
  valorcesta;

  pages: Array<{title: string, component: any}>;
  usuarioaccesoarray: Array<{usuarioacceso: string}>;

  usuariodatosarray: Array<{usuariodatos: string}>;

 formulario = 
 {
  valor: ''
}
 
  constructor(
  private storage: Storage,
  public navParams: NavParams,
  private toastCtrl: ToastController,
  public servicios:AppserviciosProvider,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      email: ['tecnico@tricenter.net', [Validators.required, Validators.email]],
      contrasena: ['tri001', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });
  }

  openInicio() {
    this.navCtrl.push(HomePage);
  }

  openCatalogo(){
      this.navCtrl.push(DatosPage);
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

  acceso() { 
     this.servicios.getAcceso2(this.myForm.value.email, this.myForm.value.contrasena).then(
     data => {
          this.datosacceso = data;
          this.usuarioacceso = JSON.stringify(data);
          this.usuarioaccesoarray = this.usuarioacceso.split('"');

          for (let usu of this.datosacceso) {

            this.variablesglobales.username = usu["CLIENTES_RAZSOCIAL"];
            this.variablesglobales.emailactivo = usu["CLIENTES_EMAIL"];
            
            console.log("Esta es la respuesta=" + usu["CLIENTES_RAZSOCIAL"]);
            
            if (usu["CLIENTES_EMAIL"] == this.myForm.value.email){
         
              this.variablesglobales.logged = true;
              this.variablesglobales.setusername(this.variablesglobales.username);
              this.variablesglobales.setusermail(this.variablesglobales.emailactivo); 
              this.variablesglobales.CLIENTES_RAZSOCIAL= this.variablesglobales.username;

              this.storage.set('email', '');
              this.storage.set('usuario', '');
              this.storage.set('pass', '');

                          // set a key/value
              this.storage.set('email', this.myForm.value.email);
              this.storage.set('usuario', this.variablesglobales.username);
              this.storage.set('pass', this.myForm.value.contrasena);  
            


            const toast = this.toastCtrl.create({
              position: "bottom",
              message: 'Usuario identificado con éxito.',
              duration: 2000
            });
            toast.present();
            this.variablesglobales.emailactivo = this.myForm.value.email;
            //CARGA LAS UNIDADES DE LA CESTA
            this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
              data => {
                 this.datoscargados5 = data;
                 for (let dat of this.datoscargados5) {
                  console.log("Obtiene valorDATA = " + dat["valor"]);

                  this.valorcesta = dat["valor"];

                  this.variablesglobales.setValorcesta(dat["valor"]);

                  this.valorcesta = this.variablesglobales.getValorcesta();
              }});
         
            } else {

                console.log("RAZSOCIAL:" + usu["CLIENTES_RAZSOCIAL"]);
                console.log("EXISTE:" + usu["CLIENTES_EXISTE"]);
                console.log("ACTIVADO:" + usu["CLIENTES_ACTIVADO"]);

                if (usu["CLIENTES_EXISTE"] == "NO"){

                  alert("El correo no existe en nuestra base de datos. Verifique que es correcto e intendelo de nuevo.");

                } else {

                 alert("La contraseña no es correcta.");

                } 
                setTimeout(function() {
                    document.getElementById("demo").innerHTML="";
                }.bind(this), 2500);

          }

        }//fin del for
          
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
          this.variablesglobales.CLIENTES_TELEFONO1 = this.usuariodatosarray[23];  
          this.variablesglobales.CLIENTES_DIRECCION = this.usuariodatosarray[27];  
          this.variablesglobales.CLIENTES_POBLACION = this.usuariodatosarray[31];  
          this.variablesglobales.CLIENTES_PROVINCIA = this.usuariodatosarray[35];  
          this.variablesglobales.CLIENTES_CPOSTAL = this.usuariodatosarray[39];  
          this.variablesglobales.CLIENTES_NIF = this.usuariodatosarray[43];  
          this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = this.usuariodatosarray['entrega'];  


          console.log("CLIENTES_CONTACTO = " + this.usuariodatosarray[7]);  // CLIENTES_CONTACTO
          console.log("CLIENTES_RAZSOCIAL = " + this.usuariodatosarray[11]); // CLIENTES_RAZSOCIAL
          console.log("CLIENTES_EMAIL = " + this.usuariodatosarray[15]); // CLIENTES_EMAIL
          console.log("CLIENTES_CONTRASENA = " + this.usuariodatosarray[19]); // CLIENTES_CONTRASENA
          console.log("CLIENTES_TELEFONO = " + this.usuariodatosarray[23]); // CLIENTES_TELEFONO1
          console.log("CLIENTES_DIRECCION = " + this.usuariodatosarray[27]); // CLIENTES_DIRECCION
          console.log("CLIENTES_POBLACION = " + this.usuariodatosarray[31]); // CLIENTES_POBLACION
          console.log("CLIENTES_PROVINCIA = " + this.usuariodatosarray[35]); // CLIENTES_PROVINCIA
          console.log("CLIENTES_CPOSTAL = " + this.usuariodatosarray[39]); // CLIENTES_CPOSTAL
          console.log("CLIENTES_NIF = " + this.usuariodatosarray[43]); // CLIENTES_NIF
          console.log("CLIENTES_DIRECCION_ENTREGA = " + this.usuariodatosarray['entrega']); // entrega
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





}
