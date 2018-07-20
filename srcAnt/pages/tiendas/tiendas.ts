import { Component } from '@angular/core';
//import { ChangeDetectorRef } from '@angular/core';
//import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { HomePage } from '../../pages/home/home';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';

//import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
import { PiboPage } from '../../pages/pibo/pibo';
import { PisaPage } from '../../pages/pisa/pisa';
import { MairenaPage } from '../../pages/mairena/mairena';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

@IonicPage()
@Component({
  selector: 'page-tiendas',
  templateUrl: 'tiendas.html',
})
export class TiendasPage {

  datoscargados;

  items: Object[] = []
  itemsInCart: Object[] = [];
  cartBadgeState: string = 'idle';

  formulario = 
  {
    valor: '',
    valor2: ''
  }

	bg;
	fon;

	scanData : {};
 
  logForm(form) {
    console.log(form.value)
  };

	encodeData : string ;
	encodedData : {} ;
	//options :BarcodeScannerOptions;
	
  constructor(
    //private toastCtrl: ToastController,
    public navCtrl: NavController,
   // private barcodeScanner: BarcodeScanner,
   // private changeDetector: ChangeDetectorRef,
    public variablesglobales: VariablesGlobalesProvider,
    
    public servicios: AppserviciosProvider
    )
  {
	  this.bg = "#ffffff";
	  this.fon = "#000000";
    
	}    
/*
  scan(){
      this.options = {
          prompt : "Situa el código a escanear "
      }

  	this.barcodeScanner.scan(this.options).then((barcodeData) => {
    console.log(barcodeData);
    this.scanData = barcodeData;

     this.variablesglobales.setBuscar2(barcodeData.text);
     this.navCtrl.push(BuscarPage);

    alert("Producto encontrado:\n" + "Codigo de Barras: " + barcodeData.text + "\n" + "Su PVP es: " + this.datoscargados);
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
*/
  openInicio() {
    this.navCtrl.push(HomePage);
  }

  openTiendas(){
      this.navCtrl.push(TiendasPage);
  }

  openPibo(){
      this.navCtrl.push(PiboPage);
  }
  
  openPisa(){
      this.navCtrl.push(PisaPage);
  }
  
  openMairena(){
      this.navCtrl.push(MairenaPage);
  }
  
  openPage(){
      this.variablesglobales.settema("ESCOLAR");
      this.variablesglobales.setlisart("REGLAS");
      this.navCtrl.push(ListaartPage);
   }


  openCatalogo(){
      this.navCtrl.push(DatosPage);
  }

  openAreacliente(){
      this.navCtrl.push(AreaclientePage);
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
