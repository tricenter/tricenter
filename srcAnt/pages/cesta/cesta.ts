import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppserviciosProvider } from '../../providers/appservicios/appservicios';
import { VariablesGlobalesProvider } from '../../providers/variablesglobales/variablesglobales';

//import { DatosaccesoPage } from '../../pages/datosacceso/datosacceso';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//import { DatosPage } from '../../pages/datos/datos';
 import { PagoPage } from '../../pages/pago/pago';
 import { DatosclientePage } from '../../pages/datoscliente/datoscliente';


 import { PiboPage } from '../../pages/pibo/pibo';
import { PisaPage } from '../../pages/pisa/pisa';
import { MairenaPage } from '../../pages/mairena/mairena';

import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the CestaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cesta',
  templateUrl: 'cesta.html',
})
export class CestaPage {

arr_pedido;

valortotal = 0;

valorterminado;
valortransporte;
valorcupon;

public payment: PayPalPayment = new PayPalPayment('0.51', 'EUR', 'Pago por PayPal a Tricenter', 'sale');
currencies = ['EUR', 'USD']
payPalEnvironment: string = 'payPalEnvironmentSandbox';

dataPaypal;

usuariodatos;
id;
subtema;
usuarioacceso;

pages: Array<{title: string, component: any}>;
usuarioaccesoarray: Array<{usuarioacceso: string}>;
usuariodatosarray: Array<{usuariodatos: string}>;

skittlesData: any;
skittles: Array<any>;  
notifications: string = 'mute_1';

rating: number = 1;


ocultar1: boolean     = false;
ocultar2: boolean     = false;
ocultar3: boolean     = false;
ocultar4: boolean     = false;
ocultar5: boolean     = false;
ocultartodos: boolean = false;



  appType = 'Paid';
  safari = 'Shared Links';
  weather = 'sunny';



	rs_cesta;
  cadena_des;
  myForm: FormGroup;
  myCupon: FormGroup;
  myFact: FormGroup;
  valorcesta;
  datoscargados5;






  constructor(
    private payPal: PayPal,
    private alertCtrl: AlertController,
  	public navCtrl: NavController,
  	public navParams: NavParams,
    public variablesglobales: VariablesGlobalesProvider,
    public servicios: AppserviciosProvider,
    public fb: FormBuilder
  ) {

    this.getSelect();

    this.loaddata();


     }


loaddata(){



 this.myFact = this.fb.group({
      razsocial: [''],
      direccion: [''],
      nif: ['']
    });

  this.myForm = this.fb.group({
      unidades: ['', [Validators.required, Validators.pattern(/^[0-9_-]{1,4}$/)]]
    });

   this.myCupon = this.fb.group({
      txtcupon: [''],
      txtcupon2: ['']
    });
  
  
  
    this.servicios.editarcesta(this.variablesglobales.emailactivo)
    .then(
          data => {
            this.rs_cesta = data;

            this.valortotal = 0;

              
              for (var _i = 0; _i < this.rs_cesta.length; _i++) {
      

                this.valortotal = this.valortotal + (this.rs_cesta[_i].CESTA_PVP_IVA * this.rs_cesta[_i].CESTA_UNIDADES );

              } 


              if (this.rating==1){
                console.log("ValorA" + this.valortotal.toFixed(2) + "  --> 6 ");
                this.valortransporte = "6.00";
              }
              if (this.rating==2){
                console.log("ValorB" + this.valortotal.toFixed(2) + "  --> 9 ");
                this.valortransporte = "9.00";
              }
              if (this.rating==3){
                this.valortransporte = 0;
              }
              if (this.rating==4){
                 this.valortransporte = 0;             
                 }
              if (this.rating==5){
                this.valortransporte = 0;              
                }
             
              if (this.variablesglobales.CLIENTES_CUPON != 0){

                  this.valorcupon = this.valortotal - this.variablesglobales.CLIENTES_CUPON;

              }

              this.valorterminado =  (this.valortotal + parseFloat(this.valortransporte) - this.variablesglobales.CLIENTES_CUPON).toFixed(2);
              

              console.log("Suma=" + this.valortotal);
              console.log("Mensajeria=" + this.valortransporte);
              console.log("CUPON=" + this.variablesglobales.CLIENTES_CUPON );

            
           }
        )
        .catch(
          error => {
            console.log(error);
          }
        )


  


// ACTUALIZA EL NUMERO DE LA CESTA
    this.servicios.obtenernumerocesta( this.variablesglobales.emailactivo).then(
    data => {
     this.datoscargados5 = data;
     for (let dat of this.datoscargados5) {
      console.log("Obtiene valorDATA = " + dat["valor"]);

      this.valorcesta = dat["valor"];

      this.variablesglobales.setValorcesta(dat["valor"]);

      this.valorcesta = this.variablesglobales.getValorcesta();
      }})
// FIN ACTUALIZA EL NUMERO DE LA CESTA











}





getSelect(){    

  this.servicios.setSelect(this.variablesglobales.emailactivo)
    .then(
        data => {
        
        var usuariodat;

        usuariodat = data;

        for (let usu3 of usuariodat) {

          this.variablesglobales.CLIENTES_CONTACTO = usu3["CLIENTES_RAZSOCIAL"]; 
          this.variablesglobales.CLIENTES_RAZSOCIAL = usu3["CLIENTES_RAZSOCIAL"];   
          this.variablesglobales.CLIENTES_CONTRASENA = usu3["CLIENTES_CONTRASENA"];   
          this.variablesglobales.CLIENTES_EMAIL = usu3["CLIENTES_EMAIL"]; 
          this.variablesglobales.CLIENTES_TELEFONO1 = usu3["CLIENTES_TELEFONO1"]; 
          this.variablesglobales.CLIENTES_DIRECCION = usu3["CLIENTES_DIRECCION"];   
          this.variablesglobales.CLIENTES_POBLACION = usu3["CLIENTES_POBLACION"];   
          this.variablesglobales.CLIENTES_PROVINCIA = usu3["CLIENTES_PROVINCIA"];   
          this.variablesglobales.CLIENTES_CPOSTAL = usu3["CLIENTES_CPOSTAL"];   
          this.variablesglobales.CLIENTES_NIF = usu3["CLIENTES_NIF"];  
          this.variablesglobales.CLIENTES_DIRECCION_ENTREGA = usu3["CLIENTES_DIRECCION_ENTREGA"];  
        }
     
      }
    )
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

  
quitardelacesta(codigo) {

  var mensaje;
  mensaje="¿Confirma quitarlo de la cesta?<br><br>"  + "Código:" + codigo.CESTA_CODIGO + "<br>" + codigo.CESTA_DESNORMAL ;

   let alert = this.alertCtrl.create({
      title: 'Cesta',
      message: mensaje,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => { console.log('No hacer nada');  }
        },{
          text: 'Si',
          handler: () => {
            this.servicios.delCesta(codigo.CESTA_CODIGO,this.variablesglobales.emailactivo);
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        }
      ]
    });
    alert.present();
  
}

editunicesta(codigo) {

 
  var mensaje;
  mensaje="¿Confirma actualizar las unidades del artículo?<br><br>"  + "Código:" + codigo.CESTA_CODIGO + "<br>" + codigo.CESTA_DESNORMAL + "<br>" + this.myForm.value.unidades;

   let alert = this.alertCtrl.create({
      title: 'Cesta',
      message: mensaje,
      cssClass: 'alertCustomCss',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => { console.log('No hacer nada');  }
        },{
          text: 'Si',
          handler: () => {

            //this.servicios.delCesta(codigo.CESTA_CODIGO,this.variablesglobales.emailactivo);
            this.servicios.eddCesta(codigo.CESTA_CODIGO,  "99999", this.myForm.value.unidades, this.variablesglobales.emailactivo);
            //this.servicios.eddCesta(codigo.CESTA_CODIGO,  "99999", this.myForm.value.unidades, this.variablesglobales.emailactivo);
        
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        }
      ]
    });
    alert.present();
  
}


  openPago(){
    this.navCtrl.push(PagoPage);
  }


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
  
  accion3() {
      this.ocultar1     = false;
      this.ocultar2     = false;
      this.ocultar4     = false;
      this.ocultar5     = false;
      this.ocultar3 = !this.ocultar3;
  }
  
  accion4() {
      this.ocultar1     = false;
      this.ocultar2     = false;
      this.ocultar3     = false;
      this.ocultar5     = false;
      this.ocultar4 = !this.ocultar4;
  }

  accion5() {
      this.ocultar1     = false;
      this.ocultar2     = false;
      this.ocultar3     = false;
      this.ocultar4     = false;
      this.ocultar5 = !this.ocultar5;
  }
  
  
  checkActiveButton() {
    
    if ( this.ocultar1 && this.ocultar2 && this.ocultar3 && this.ocultar4 && this.ocultar5) {
      
      this.ocultartodos = true;
    }
    else if ( !this.ocultar1 && !this.ocultar2 && !this.ocultar3 && !this.ocultar4 && !this.ocultar5) {
     
      this.ocultartodos = false;
    }
  }
  
  acciontodos() { 

    if ( this.ocultartodos === false ) {
      
      this.ocultar1     = true;
      this.ocultar2     = true;
      this.ocultar3     = true;
      this.ocultar4     = true;
      this.ocultar5     = true;
    }
    else {
      
      this.ocultar1     = false;
      this.ocultar2     = false;
      this.ocultar3     = false;
      this.ocultar4     = false;
      this.ocultar5     = false;
    }
    
    this.ocultartodos = !this.ocultartodos;
  }

iradatos(){

    this.navCtrl.push(DatosclientePage);


}

  openPibo(){
      this.navCtrl.push(PiboPage);
  }
  
  openPisa(){
      this.navCtrl.push(PisaPage);
  }
  
  openMairena(){
      this.navCtrl.push(MairenaPage);
  }






makePayment() {
   
  }












  pagar () {

   let payment: PayPalPayment = new PayPalPayment(this.valorterminado.toString(), 'EUR', 'Pago del pedido', 'sale');
   var clientIDs = {
      "PayPalEnvironmentProduction": "Ab7USSkli1xVz4Pa48S16akUtALf8kt7OOePt3QdMCfIz3JqcaBLaQDHIdpt2ZRS80z00g-NXFyv795G",
      "PayPalEnvironmentSandbox": "ATHY9aVPlbgXKQ_ow-pxxn8phgRHcIRvhsN09L2E4GoFDWWD5eVmUfF4HsQhjhkOJwNrKs-YFp5rf0r5",
      "payPalEnv": 'PayPalEnvironmentSandbox',   // for testing  production for production
      "payPalShopName" : 'tricenter',
      "paypalLanguageOrLocale" : 'sp_SP'
    };
    this.payPal.init(clientIDs).then(() => {

      //Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //PalShippingAddressOption: 2 
        //PalShippingAddressOptionPayPal
      })).then(() => {
      //  let payment = new PayPalPayment("10", 'EUR', "Opv", 'sale');
      // this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.payPal.renderSinglePaymentUI(payment).then(data => {
          this.dataPaypal = JSON.stringify(data)
          this.dataPaypal = this.dataPaypal.split('"')

          if(data.response.state=="payment"){
             //------------------------------------------
             /* EL PAGO SE HA REALIZADO CORRECTAMENTE */

             var mensaje;
              mensaje="Correcto.<br>El pago se ha realizado correctamente.<br><br>Su pedido se acaba de poner en marcha.<br>Podrá consultar el estado del mismo en el menu principal.<br>Gracias por confiar en nosotros.<br>El equipo de Tricenter." ;

               let alert = this.alertCtrl.create({
                  title: 'Pedido',
                  message: mensaje,
                  cssClass: 'alertCustomCss',
                  buttons: [
                    {
                      text: 'Aceptar',
                      role: 'No',
                      handler: () => {
                        this.grabarpedido();
                        }
                    }
                  ]
                });
                alert.present();
              



          }

          // SI EL PAGO SE HACE CORRECTAMENTE, EL MENSAJE QUE LE APARECE AL CLIENTE ES ALGO PARECIDO A ESTO
          // {  "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, (erro) => {         alert("Paypa1 contexta esto=" + erro);
          // Error or render dialog closed without being successful
        });
      }, (erro) => { alert("Paypal2 contexta esto=" + erro);
        // Error in configuration
      });
    }, (erro) => { 


        //alert("Fallo lógico=" + erro


             //------------------------------------------
             /* PAGO PROVISISIONAL */

             var mensaje;
              mensaje="El pago se ha realizado correctamente.<br><br>Su pedido ha sido recibido correctamente.<br>Podrá consultar su estado desde el menú principal <-Pedidos realizados->.<br><br>El equipo de Tricenter."

               let alert = this.alertCtrl.create({
                  title: 'Perfecto',
                  message: mensaje,
                  cssClass: 'alertCustomCss',
                  buttons: [
                    {
                      text: 'Aceptar',
                      role: 'No',
                      handler: () => {this.grabarpedido(); }
                    }
                  ]
                });
                alert.present();
              

      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }//FIN PAGO ()


  grabarpedido() {  

    var fecha = new Date();
    var ped_cod = fecha.getFullYear()+(fecha.getMonth()+1)+fecha.getDate()+fecha.getHours()+fecha.getMinutes();

    for (var _i = 0; _i < this.rs_cesta.length; _i++) {
      this.arr_pedido = {};
      this.arr_pedido["codigo"] = ped_cod;
      this.arr_pedido["provincia"] = this.variablesglobales.CLIENTES_PROVINCIA;
      this.arr_pedido["email"] = this.variablesglobales.emailactivo;
      this.arr_pedido["fecha"] = fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear();
      this.arr_pedido["hora"] = fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds();
      this.arr_pedido["razsocial"] = this.variablesglobales.CLIENTES_RAZSOCIAL ;
      this.arr_pedido["telefono"] = this.variablesglobales.CLIENTES_TELEFONO1;
      this.arr_pedido["direccion"] = this.variablesglobales.CLIENTES_DIRECCION;
      this.arr_pedido["cpostal"] = this.variablesglobales.CLIENTES_CPOSTAL;
      this.arr_pedido["poblacion"] = this.variablesglobales.CLIENTES_POBLACION;
      this.arr_pedido["provincia"] = this.variablesglobales.CLIENTES_PROVINCIA;
      this.arr_pedido["nif"] = this.variablesglobales.CLIENTES_NIF;

      this.arr_pedido["direccion_entrega"] = this.variablesglobales.CLIENTES_DIRECCION_ENTREGA;

      this.arr_pedido["ref"] = this.variablesglobales.CLIENTES_POBLACION;
      this.arr_pedido["desnormal"] = this.variablesglobales.CLIENTES_PROVINCIA;


      this.valortotal = this.valortotal + Number.parseFloat(this.rs_cesta[_i].CESTA_PVP);
    }  


    
    this.servicios.addRegistro(this.arr_pedido );

    alert(`Pedido guardado correctamente. <br>Puede reutilizarlo para futuras compras desde el menú de usuario.<br><br>Grcias por confiar en nosotros.`);
  }


obtenercupon(){



  this.servicios.cupon(this.myCupon.value.txtcupon)
    .then(
        data => {
        var cuponn;
        cuponn = data;

        for (let cupo of cuponn) {

          this.valorcupon = cupo["valor"];
          break;

        }

        console.log('No hacer nada-->' +    this.variablesglobales.CLIENTES_CUPON);
     
        if (this.variablesglobales.CLIENTES_CUPON == 0){
            var mensaje;
            mensaje="Se ha encontrado un cupón de descuento.<br><br>Descuento de -" + this.valorcupon ;

             let alert = this.alertCtrl.create({
                title: 'Cesta',
                message: mensaje,
                cssClass: 'alertCustomCss',
                buttons: [
                  {
                    text: 'Aplicar descuento',
                    role: 'No',
                    handler: () => {
                     

                             this.variablesglobales.CLIENTES_CUPON = this.valorcupon;
                             this.valorterminado =  this.valorterminado - this.valorcupon;
                             console.log("Valor del cupon apliocad=" + this.variablesglobales.CLIENTES_CUPON);





                     }
                  }
                ]
              });
              alert.present();
            


        }

      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
}


}
/*

Card Type: Visa

Card Number: 4654 2683 6853 5161

Expiration Date: 03/2028

CVV: 900

*/