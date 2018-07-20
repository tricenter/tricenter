import { Component, ViewChild } from '@angular/core';
//import { IonicApp, IonicModule} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { HomePage } from '../pages/home/home';
import { PedAntPage } from '../pages/ped-ant/ped-ant';
import { PedidoPage } from '../pages/pedido/pedido';
//import { DatosPage } from '../pages/datos/datos';
//import { SubFamPage } from '../pages/subfamilia/subfamilia';
//import { ListaartPage } from '../pages/listaart/listaart';
//import { BuscarPage } from '../pages/buscar/buscar';
import { AreaclientePage } from '../pages/areacliente/areacliente';
import { AltausuarioPage } from '../pages/altausuario/altausuario';
import { DatosclientePage } from '../pages/datoscliente/datoscliente';
//import { TiendasPage } from '../pages/tiendas/tiendas';
//import { CestaPage } from '../pages/cesta/cesta';
//import { PiboPage } from '../pages/pibo/pibo';
//import { PisaPage } from '../pages/pisa/pisa';
//import { MairenaPage } from '../pages/mairena/mairena';
//import { DatosaccesoPage } from '../pages/datosacceso/datosacceso';

import { AppserviciosProvider } from '../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../providers/variablesglobales/variablesglobales';

@Component({
  templateUrl: 'app.html',
  selector: 'tasks',
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    VariablesGlobalesProvider,
    AppserviciosProvider,
    ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  clientename: string;

  pages: Array<{title: string, component: any}>;
  pageslogged: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public servicios:AppserviciosProvider, public variablesglobales:VariablesGlobalesProvider) 
  {
    platform.ready().then(() => {
    statusBar.styleDefault();
    splashScreen.hide();
    });

    this.pageslogged = [ // Menu cuando esta LOGGEADO
      { title: 'Mi cuenta', component: DatosclientePage }, 
    //  { title: 'Modificar datos de acceso', component: DatosaccesoPage }, 
      { title: 'Pedidos realizados', component: PedAntPage }
    //  { title: 'Consultar sus facturas', component: HomePage }
    ];
  
    this.pages = [ // Menu de INVITADO
      { title: 'Iniciar sesión', component: AreaclientePage },
      { title: 'Registrarse', component: AltausuarioPage } 
    ];
  } // fin constructor


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  
}
