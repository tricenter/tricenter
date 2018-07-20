import { Component, ViewChild} from '@angular/core';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
//import { ListaPage } from '../../pages/lista/lista';
//import { CestaPage } from '../../pages/cesta/cesta';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
//import { Http } from '@angular/http';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  datoscargados;
  cabecera: any;
  formulario = { valor: "" }
  bg;
	fon;
  lupa: boolean = false;
  datoscargados3;
  valorcesta;
	scanData : {};
 
  logForm(form) {
    console.log(form.value)
  };

	encodeData : string ;
	encodedData : {} ;
	options :BarcodeScannerOptions;
	
  constructor(
    private storage: Storage,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public variablesglobales: VariablesGlobalesProvider,
    public servicios: AppserviciosProvider,
  )
  {
	  this.bg = "#ffffff";
	  this.fon = "#000000";
    this.storage.get('email').then((val) => {
      if (val != "" && val != null){
        this.variablesglobales.emailactivo = val;
        this.variablesglobales.logged = true;
    this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
    data => {
     this.datoscargados3 = data;
     for (let dat of this.datoscargados3) {
      console.log("El carrito tiene " + dat["valor"] + " productos añadidos");

      this.valorcesta = dat["valor"];

      this.variablesglobales.setValorcesta(dat["valor"]);

      this.valorcesta = this.variablesglobales.getValorcesta();
      }})
      }      
    });
    this.storage.get('usuario').then((val) => {
      this.variablesglobales.CLIENTES_RAZSOCIAL = val;
    });
   
  }  

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

	scan(){
    this.options = {
      prompt : "Situa el código a escanear "
    }
  	this.barcodeScanner.scan(this.options).then((barcodeData) => {
    console.log(barcodeData);
    this.scanData = barcodeData;

    this.variablesglobales.setBuscar2(barcodeData.text);
    this.navCtrl.push(BuscarPage);

  	}, (err) => {
      	console.log("Ha ocurrido un error: " + err);
  	});         
	}
	
  encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

    console.log(encodedData);
    this.encodedData = encodedData;

    }, (err) => {
        console.log("Ha ocurrido un error: " + err);
    });                 
  }   

  openPage(){
    this.variablesglobales.settema("ESCOLAR");
    this.variablesglobales.setlisart("REGLAS");
    this.navCtrl.push(ListaartPage);
   }

  openCatalogo(){
    this.navCtrl.push(DatosPage);
  }


  openTiendas(){
    this.navCtrl.push(TiendasPage);
  }


 openAreacliente(){
      this.navCtrl.push(AreaclientePage);
  }
  
  openBuscar2() 
  { 
    if(this.formulario.valor.length == 1 || this.formulario.valor.length == 2)
    {
      const toast = this.toastCtrl.create({
        position: "bottom",
        message: 'Introduzca al menos tres caracteres.',
        duration: 2000
      });
      toast.present();

    }
    else 
    {
      if(this.formulario.valor.length == 0)
      {
         console.log("");
      }
      else
      {
        this.variablesglobales.setBuscar2(this.formulario.valor);
        this.navCtrl.push(BuscarPage);   
      }
    }
  }
}