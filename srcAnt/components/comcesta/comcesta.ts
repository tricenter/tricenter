import { Component } from '@angular/core';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
import { HomePage } from '../../pages/home/home';
import { CestaPage } from '../../pages/cesta/cesta';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';

//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
//import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

import { trigger, state, style, animate, keyframes, transition } from '@angular/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * Generated class for the ComcabeceraComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'comcesta',
  templateUrl: 'comcesta.html',

   animations: [
    trigger('cartBadge', [
        state('idle', style({
            opacity: '1',
            backgroundColor: '#000000',
            transform: 'scale(1)'
        })),
        
        state('adding', style({
            opacity: '1',
            backgroundColor: '#000000',
            transform: 'scale(1)'
        })),
        
        transition('idle <=> adding', animate(750, keyframes([    
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
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
            style({transform: 'translateX(200%)'}),
            animate('300ms ease-in-out')
        ])
    ])    
  ]

})
export class ComcestaComponent {

	text: string;
	datoscargados;
  	cabecera: any;
	formulario = {valor: ""}
	bg;
	fon;
	lupa: boolean = false;
	logForm(form) {
    	console.log(form.value)
  	};
	encodeData : string ;
	encodedData : {} ;
	options :BarcodeScannerOptions;

  	constructor(
	    private toastCtrl: ToastController,
	    public navCtrl: NavController,
	    private barcodeScanner: BarcodeScanner,
	    public variablesglobales: VariablesGlobalesProvider,
	    public servicios: AppserviciosProvider,
  		) 
  	{
    	this.text = '';
   		this.bg = "#ffffff";
	  	this.fon = "#000000";
	}    

	  openInicio() {
  		  this.navCtrl.push(HomePage);
  		}
  

	scan(){
	    this.options = {
	        prompt : "Situa el código a escanear "
	    }
    	this.barcodeScanner.scan(this.options).then((barcodeData) => {

      
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

   openCesta() {
    this.navCtrl.push(CestaPage);
  }

 openAreacliente(){
      this.navCtrl.push(AreaclientePage);
  }
 
}
