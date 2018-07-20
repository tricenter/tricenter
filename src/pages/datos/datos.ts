import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../../pages/home/home';

import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { BuscarPage } from '../../pages/buscar/buscar';
//import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';

@IonicPage()


@Component({
  selector: 'page-datos',
  templateUrl: 'datos.html'
  })

export class DatosPage {
  
  @ViewChild(Nav) nav: Nav;

  arttemas;
  artsubtemas;
  id;
  subtema;
  pages: Array<{title: string, component: any}>;
  
 formulario = 
 {
  valor: ''
}
  bg;
  fon;

  constructor(
      public navCtrl: NavController,
      public navparams: NavParams, 
      public variablesglobales: VariablesGlobalesProvider,
      public servicios: AppserviciosProvider,
      public platform: Platform, 
      public statusBar: StatusBar, 
      public splashScreen: SplashScreen
      ){

    this.bg = "#ffffff";
    this.fon = "#000000";
    this.pages = [
      { title: 'Inicio', component: HomePage },
       { title: 'SubTemas', component: SubFamPage }
    ];

  // If we navigated to this page, we will have an item available as a nav param
  //this.selectedItem = navParams.get('item');
  // Let's populate this page with some filler content for funzies
    this.loadData();

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

  ionViewDidLoad() {
    console.log('Estas en DatosPage');
  }

  openPage(subtema) {
    console.log('Abrir los subtemas:' + subtema.ARTICULOS_TEMA);
    this.variablesglobales.settema(subtema.ARTICULOS_TEMA);
    this.variablesglobales.setimagentema(subtema.ARTICULOS_IMAGEN);
    
    this.navCtrl.push(SubFamPage);
  }

   openTiendas(){
      this.navCtrl.push(TiendasPage);
      this.variablesglobales.lupa = false;
  }

  openInicio() {
    this.navCtrl.push(HomePage);
    this.variablesglobales.lupa = false;
  }

  openCatalogo(){
      this.navCtrl.push(DatosPage);
      this.variablesglobales.lupa = false;
  }

/*    openBuscar() {
    
    console.log(this.formulario.valor);
     
      if(this.formulario.valor.length > 0){
        console.log("EL USUARIO ESTA UTILIZANDO EL BUSCADOR");
        this.navCtrl.push(BuscarPage);
      }
    }
*/
   openBuscar2() { 
    //console.log(this.formulario.valor);
      if(this.formulario.valor.length < 3){
         console.log("Para la busqueda, minimo 3 caracteres");
       } else {
        this.variablesglobales.setBuscar2(this.formulario.valor);
        this.navCtrl.push(BuscarPage);
      }
    }
}