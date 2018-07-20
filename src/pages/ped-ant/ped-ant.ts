import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { PedidoPage } from '../../pages/pedido/pedido';

/**
 * Generated class for the PedAntPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ped-ant',
  templateUrl: 'ped-ant.html',
})
export class PedAntPage {

  itemData: any = [];
  items = [];
  posicion: number = 0;
  pos: number = 0 ;


  constructor(
    public variablesglobales: VariablesGlobalesProvider,
    public servicios: AppserviciosProvider,    
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	) {
  }

  ionViewDidLoad() {
    console.log("Entras en Ped-Ant");


  	this.servicios.getpedidosanteriores(this.variablesglobales.emailactivo).then(
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

  openPedido(numero,hora,imp) { 
    console.log("Valores de la cabecera nº " + numero +   " F: " + hora + " Impor" + imp);
    this.variablesglobales.setNumeroPedido(numero);
    this.variablesglobales.setFechaPedido(hora);
    this.variablesglobales.setImportePedido(imp);
    this.navCtrl.push(PedidoPage);
  }

}
