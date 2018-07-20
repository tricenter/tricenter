import { Component, ViewChild} from '@angular/core';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ListaartPage } from '../../pages/listaart/listaart';
import { DatosPage } from '../../pages/datos/datos';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
import { ToastController } from 'ionic-angular';
import { ListaPage } from '../../pages/lista/lista';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { Storage } from '@ionic/storage';
import { PedAntPage } from '../../pages/ped-ant/ped-ant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  itemData: any = [];
  items = [];
  posicion: number = 0;
  pos: number = 0 ;

  datoscargados;
  cabecera: any;
  formulario = { valor: "" }
  bg;
	fon;
  lupa: boolean = false;
  datoscargados3;
  valorcesta;
	scanData : {};

  topventas: number = 26;
 
  logForm(form) {
    console.log(form.value)
  };

	encodeData : string ;
	encodedData : {} ;
	options :BarcodeScannerOptions;


ocultar1: boolean     = false;
ocultar2: boolean     = true;
ocultar3: boolean     = false;
ocultar4: boolean     = false;
ocultar5: boolean     = false;
ocultartodos: boolean = false;
	
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

      this.loadData();
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
	
  openArticulo(value) { 
    this.variablesglobales.setBuscar(value);
    this.navCtrl.push(ListaPage);
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
  

  loadData() {   
    this.servicios.getMasVendidos(this.topventas).then(
      data => {
        this.itemData = data;
      

          for (let x = 0; x < 5; x++) {
            if ( this.posicion < this.itemData.length){
              this.items.push( data[x] );
              this.posicion++;
            }
            else 
            {
              break;
            }
          } // fin for
       })
      .catch(
        error => {
          console.log(error);
        }
      )
   }

   doInfinite(infiniteScroll) {
        setTimeout(() => {
          this.pos = this.posicion;
             for (let x = this.posicion; x < this.pos + 5; x++) {
               this.posicion++;
                if ( this.posicion < this.itemData.length){
                    this.items.push( this.itemData[x] );
                }
                else
                {
                  break;
                }
             } // fin FOR
            this.posicion = this.posicion + 5;
          
          infiniteScroll.complete();
        }, 500);
    } // fin Funcion doInfinite


accion1() {

    this.ocultar2     = false;
    this.ocultar3     = false;
    this.ocultar4     = false;
    this.ocultar5     = false;
    this.ocultar1 = !this.ocultar1;
   
  }
  accion2() {
    this.ocultar1     = false;
    this.ocultar3     = false;
    this.ocultar4     = false;
    this.ocultar5     = false;
    this.ocultar2 = !this.ocultar2;
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