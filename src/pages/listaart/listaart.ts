import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { SubFamPage } from '../../pages/subfamilia/subfamilia';
import { DatosPage } from '../../pages/datos/datos';
import { HomePage } from '../../pages/home/home';
import { BuscarPage } from '../../pages/buscar/buscar';
import { AreaclientePage } from '../../pages/areacliente/areacliente';
//import { AltausuarioPage } from '../../pages/altausuario/altausuario';
//import { DatosclientePage } from '../../pages/datoscliente/datoscliente';
import { TiendasPage } from '../../pages/tiendas/tiendas';
import { ListaPage } from '../../pages/lista/lista';
//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';


  @IonicPage()
  @Component({
    selector: 'page-listaart',
    templateUrl: 'listaart.html',
  })
  export class ListaartPage {
     
     formulario = 
   {
    valor: '',
    valor2: ''
  }

  fechaStringArray: Array<{dateToday: string}>;

  temaactivo;
  subtemaactivo;
  datoscargados;
  unidades;
  codigo;
  todayDate = new Date();
  fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' +this.todayDate.getHours() + '' + this.todayDate.getMinutes()+ '' + this.todayDate.getSeconds());

 myForm: FormGroup;

 constructor(
  public navParams: NavParams,
  private toastCtrl: ToastController,
  public servicios:AppserviciosProvider,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      unidades: ['1', [Validators.pattern(/^[0-9_-]{1,4}$/)]],
      codigo: ['', [Validators.pattern(/^[0-9_-]{5,6}$/)]],
      ARTICULOS_DESNORMAL: ['', ],
    });
this.loadData();
  }



loadData() {    
  this.temaactivo = this.variablesglobales.gettema();
  this.subtemaactivo = this.variablesglobales.getlisart();
  console.log("listart = " + this.temaactivo + "/" + this.subtemaactivo );

  this.servicios.getlistart(this.subtemaactivo).then(
      data => {
        this.datoscargados = data;
        console.log("Obtiene valor = " + this.datoscargados);
      })
    .catch(
      error => {
        console.log(error);
      }
    )
  }


openPage(subtema) {
	console.log('Abrir la lista de articulos:' + subtema.ARTICULOS_SUBTEMA);
	this.variablesglobales.setlisart(subtema.ARTICULOS_SUBTEMA);
	this.navCtrl.push(ListaartPage);
}

abrelaPage(page) {
	if(page=="subtema") {  
		this.navCtrl.push(SubFamPage);
	}
	
	if(page=="tema") {  
		this.navCtrl.push(DatosPage);
	}

}

ionViewDidLoad() {
  console.log('Estas en listaart');
}

openCatalogo(){
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

openArticulo(value) { 
    this.variablesglobales.setBuscar(value);
    this.navCtrl.push(ListaPage);
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


cesta(value) {
    if (this.variablesglobales.emailactivo == ""){
      
      this.navCtrl.push(AreaclientePage);
      console.log("Debe iniciar sesion antes de comprar");
     

    } else {

      this.unidades = this.myForm.value.unidades;
      this.codigo = value;
      console.log("Las unidades son " + this.unidades);
      console.log("El codigo del articulo es " + this.codigo);
      console.log("El E-Mail activo es " + this.variablesglobales.emailactivo);
      console.log("La fecha concatenada es " + this.fecha);   
     
      this.servicios.addCesta(this.codigo, this.unidades, this.fecha, this.variablesglobales.emailactivo)

    }
  } // fin cesta



}