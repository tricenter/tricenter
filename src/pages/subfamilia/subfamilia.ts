import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { ListaartPage } from '../../pages/listaart/listaart';
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
  selector: 'page-subfamilia',
  templateUrl: 'subfamilia.html',
})
export class SubFamPage {
  temaactivo;
  imagentemaactivo;
  artsubtemas;
  id;

  formulario = 
  {
    valor: '',
    valor2: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public servicios:AppserviciosProvider, public variablesglobales:VariablesGlobalesProvider) {
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('Estas en subfamilia');
  }

 loadData(){    
  this.temaactivo = this.variablesglobales.gettema();
  this.imagentemaactivo = this.variablesglobales.getimagentema();
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

  openPage(subtema){
    console.log('Abrir la lista de articulos:' + subtema.ARTICULOS_SUBTEMA);
    this.variablesglobales.setlisart(subtema.ARTICULOS_SUBTEMA);
    this.navCtrl.push(ListaartPage);
  }

    
  abrelaPage(page){
    if(page=="subtema") {  
      // statement(s) will execute if the boolean expression is true
        console.log("Esta es la página = " + page);
      this.navCtrl.push(SubFamPage);
    }
    
    if(page=="tema") {  
      // statement(s) will execute if the boolean expression is true
      this.navCtrl.push(DatosPage);
    }
    
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

