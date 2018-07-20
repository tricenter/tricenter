import { Component } from '@angular/core';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { HomePage } from '../../pages/home/home';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-filtro',
  templateUrl: 'filtro.html',
})
export class FiltroPage {

 structure: any = {lower: 0, upper: 1000};

 onChange(ev: any) {
    //console.log('Rango de precio entre ' + this.structure.lower + ' y ' + this.structure.upper + ' euros');
  }

	myForm: FormGroup;
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
      private storage: Storage,
	    private toastCtrl: ToastController,
	    public navCtrl: NavController,
	    private barcodeScanner: BarcodeScanner,
	    public variablesglobales: VariablesGlobalesProvider,
	    public servicios: AppserviciosProvider,
      public fb: FormBuilder
  ) {


    this.storage.get('valorabuscar').then((val) => {
      this.formulario.valor = val;
    });

  		/*
    this.myForm = this.fb.group({
      precioFiltro: ['', [Validators.required]],
    });
    */
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

  openAreacliente(){
    this.navCtrl.push(AreaclientePage);
  }
  
  openBuscar2() { 
      console.log('Rango de precio entre ' + this.structure.lower + ' y ' + this.structure.upper + ' euros');
    if(this.formulario.valor.length == 1 || this.formulario.valor.length == 2){
                   
      const toast = this.toastCtrl.create({
        position: "bottom",
        message: 'Introduzca al menos tres caracteres.',
        duration: 2000
      });
      toast.present();

    } else {

      if(this.formulario.valor.length == 0)
       {
         console.log("Busqueda vacia");
       }
       else{
          this.variablesglobales.setBuscar2(this.formulario.valor);
          this.variablesglobales.setLower(this.structure.lower);
          this.variablesglobales.setUpper(this.structure.upper);
          this.navCtrl.push(BuscarPage);   
       }
          
    }
  }
/*
  abreBusqueda() { 
    if(this.variablesglobales.lupa == true){
      this.variablesglobales.lupa = false;
    }else{
       this.variablesglobales.lupa = true;
    }
  }
*/

}
