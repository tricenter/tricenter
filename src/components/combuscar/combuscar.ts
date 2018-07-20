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
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { ToastController } from 'ionic-angular';
//import { Http } from '@angular/http';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'combuscar',
  templateUrl: 'combuscar.html'
})

export class CombuscarComponent {



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
/*
  knobValues: any = {
    upper:1000,
    lower:10
  }
*/
  	constructor(
      private storage: Storage,
	    private toastCtrl: ToastController,
	    public navCtrl: NavController,
	    private barcodeScanner: BarcodeScanner,
	    public variablesglobales: VariablesGlobalesProvider,
	    public servicios: AppserviciosProvider,
      public fb: FormBuilder
  ) {

 /*       this.storage.set('valorabuscar', '');
        this.storage.set('orden', '');
        this.storage.set('menor', '');
        this.storage.set('myor', '');
*/

    this.myForm = this.fb.group({
      precioFiltro: ['', [Validators.required]],
    });


  }
  		




}
