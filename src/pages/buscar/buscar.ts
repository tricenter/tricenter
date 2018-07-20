import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';
import { ListaPage } from '../../pages/lista/lista';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})

export class BuscarPage {

miModelo: any;
unidades: number;
codigo: number;
todayDate = new Date();
fecha = (this.todayDate.getFullYear() + '' + ((this.todayDate.getMonth() + 1)) + '' + this.todayDate.getDate() + '' +this.todayDate.getHours() + '' + this.todayDate.getMinutes()+ '' + this.todayDate.getSeconds());

formulario = { valor: '', }
  
itemData: any = [];
items = [];
posicion: number = 0;
pos: number = 0 ;
 
myForm: FormGroup;

 constructor(
  public navParams: NavParams,
  public servicios:AppserviciosProvider,
  private toastCtrl: ToastController,
  public variablesglobales:VariablesGlobalesProvider,
  public navCtrl: NavController,
  public fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      unidades: ['1', [Validators.required, Validators.pattern(/^([0-9]|1[0])$/)]],
      codigo: ['', [Validators.required, Validators.pattern(/^[1-9_-]{5,6}$/)]],
      ARTICULOS_DESNORMAL: ['', ],
    });

  this.loadData();
  this.miModelo = {};
  }

  openLista(){
    this.navCtrl.push(ListaPage);
  }

  openArticulo(value) { 
    this.variablesglobales.setBuscar(value);
    this.navCtrl.push(ListaPage);
  }

  loadData() {   
    if (this.variablesglobales.lower == null && this.variablesglobales.upper == null ) {
      this.variablesglobales.lower = 0;
      this.variablesglobales.upper = 1000;
    }
    this.servicios.getBuscar2(this.variablesglobales.buscar2, this.variablesglobales.lower, this.variablesglobales.upper).then(
      data => {
        this.itemData = data;
        if ( this.itemData == "" || this.itemData == null ){
           const toast = this.toastCtrl.create({
              position: "bottom",
              message: 'Ese articulo no se encuentra en nuestro almacen',
              duration: 3000
            });
            toast.present();
        } else {
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
         } // fin else
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

}