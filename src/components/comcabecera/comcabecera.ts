import { Component} from '@angular/core';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { CestaPage } from '../../pages/cesta/cesta';
import { FiltroPage } from '../../pages/filtro/filtro';
import { HomePage } from '../../pages/home/home';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

@Component({
  selector: 'comcabecera',
  templateUrl: 'comcabecera.html',
})

export class ComcabeceraComponent {

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
    //private changeDetector: ChangeDetectorRef,
    public servicios: AppserviciosProvider,
		) 
  {
   	this.text = '';
  	this.bg = "#ffffff";
   	this.fon = "#000000";
    this.variablesglobales.lupa = false;  // cierra el campo de busqueda al cambiar de pagina


  }    

  openFiltro() {
    this.navCtrl.push(FiltroPage);
  }

	openInicio() {
    this.navCtrl.push(HomePage);
  }

  openCesta() {
      if (this.variablesglobales.logged != true){
        this.navCtrl.push(AreaclientePage);
      }
     else {
        this.navCtrl.push(CestaPage);   
     } 
  }
    
	scan(){
    this.options = {
        prompt : "Situa el código a escanear "
    }
  	this.barcodeScanner.scan(this.options).then((barcodeData) => {
    console.log(barcodeData);
    
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

  openDatoscliente(){
      this.navCtrl.push(DatosclientePage);
  }
  
  openBuscar2() { 
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
           console.log("");
         }
         else{
            this.variablesglobales.setBuscar2(this.formulario.valor);
            this.navCtrl.push(BuscarPage);   
         }
        
    }
  }

  abreBusqueda() { 
      if(this.variablesglobales.lupa == true){
        this.variablesglobales.lupa = false;
      }else{
         this.variablesglobales.lupa = true;
      }
  }


}
