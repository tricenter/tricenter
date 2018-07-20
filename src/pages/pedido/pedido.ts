import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { PedAntPage } from '../../pages/ped-ant/ped-ant';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the PedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  NumeroPedido;
  FechaPedido;
  ImportePedido;
  itemData: any = [];
  items = [];
  posicion: number = 0;
  pos: number = 0 ;
  cadena_des;


  constructor(
  	private toastCtrl: ToastController,
    public variablesglobales: VariablesGlobalesProvider,
    public servicios: AppserviciosProvider,  	  	
  	public navCtrl: NavController,
  	public navParams: NavParams

  ) {
  }

  ionViewDidLoad() {
  	console.log('Entra Usted en: pedido' + this.variablesglobales.getNumeroPedido());

  	this.NumeroPedido = this.variablesglobales.getNumeroPedido();
  	this.FechaPedido = this.variablesglobales.getFechaPedido();
  	this.ImportePedido = this.variablesglobales.getImportePedido();

  	this.servicios.getpedidoanterior(this.NumeroPedido).then(
      data => {
        this.itemData = data;
  		  console.debug(this.itemData.length);
          for (let x = 0; x < this.itemData.length; x++) {
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



  
mostrar_des(cadena) {
  var pos;
  this.cadena_des = cadena;
  pos = cadena.indexOf(" ");
  
  this.cadena_des = cadena.substring(0,pos+1);
  cadena = cadena.substring(pos + 1); 
  pos = cadena.indexOf(" ");
  this.cadena_des = this.cadena_des + cadena.substring(0,pos+1);

  cadena = cadena.substring(pos + 1); 
  pos = cadena.indexOf(" ");
  this.cadena_des = this.cadena_des + cadena.substring(0,pos+1);

//  this.cadena_des = this.cadena_des + cadena;

  return this.cadena_des + "...";

}





 cesta(codigo) {

 	var datoscarga;
 	var datoscarga2;
      this.servicios.addCesta(codigo, "1", "1", this.variablesglobales.emailactivo).then(
        data => {
         datoscarga = data;
         for (let dat of datoscarga) {
            
            console.log("Obtiene valorDATA = " + dat["RESULTADO"]);
             
            if (dat["RESULTADO"]=="OK"){
            
              const toast = this.toastCtrl.create({
                position: "top",
                message: 'Artículo añadido.',
                duration: 3000
              });
              toast.present();
             
              this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
              data => {
                datoscarga2 = data;
                  for (let dat of datoscarga2) {
                  console.log("Obtiene valorDATA = " + dat["valor"]);

                  this.variablesglobales.setValorcesta(dat["valor"]);
              }})
            } // fin if
           } // fin for
          })
        .catch(
          error => {
            console.log(error);
        }
      )
  } // fin cesta
}
