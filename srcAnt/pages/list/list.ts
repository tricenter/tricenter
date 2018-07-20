import { Component } from '@angular/core';
//import { Nav } from 'ionic-angular';
//import { Platform } from 'ionic-angular';
//import { IonicModule } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

//import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { BuscarPage } from '../../pages/buscar/buscar';
//import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
//import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

   temaactivo;
   artsubtemas;
   id;

 formulario = 
 {
  valor: '',
  valor2: ''
}

   constructor(
    public navCtrl: NavController,
    public variablesglobales: VariablesGlobalesProvider,
    public servicios: AppserviciosProvider
    ) {

       this.loadData();
  }

   loadData(){    
    this.temaactivo = this.variablesglobales.gettema();
    console.log("Abre datos page con valor = " + this.temaactivo);

    this.servicios.getsubtema(this.temaactivo)
        .then(
            data => {
              this.artsubtemas = data;
              console.log("Obtiene valor = " + data);
            }
          )
          .catch(
            error => {
              console.log(error);
            }
          )
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }


openCatalogo(){
     console.log("ABRIR YA");
      this.variablesglobales.settema("ESCOLAR");
      this.variablesglobales.setlisart("REGLAS");
      this.navCtrl.push(DatosPage);
    }

   openInicio() {
    this.navCtrl.push(HomePage);
  }

   openTiendas(){
      this.navCtrl.push(TiendasPage);
  }

  openBuscar() {
    this.navCtrl.push(BuscarPage);

  }



}

