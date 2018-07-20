import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pago',
  templateUrl: 'pago.html',
})
export class PagoPage {

payment: PayPalPayment = new PayPalPayment('0.01', 'EUR', 'Pago por PayPal a Tricenter', 'sale');
currencies = ['EUR', 'USD']
payPalEnvironment: string = 'payPalEnvironmentSandbox';

dataPaypal;


  constructor(public navCtrl: NavController, public navParams: NavParams, private payPal: PayPal) {
  }



 

	pagar () {



		this.payPal.init({
   PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
   PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
 }).then(() => {
   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
     // Only needed if you get an "Internal Service Error" after PayPal login!
     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
   })).then(() => {
     let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
     this.payPal.renderSinglePaymentUI(payment).then(() => {
       // Successfully paid

       // Example sandbox response
       //
       // {
       //   "client": {
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
     }, () => {
       // Error or render dialog closed without being successful
     });
   }, () => {
     // Error in configuration
   });
 }, () => {
   // Error in initialization, maybe PayPal isn't supported or something else
 });


/*		this.payPal.init({
		  PayPalEnvironmentProduction: '',     // 'YOUR_PRODUCTION_CLIENT_ID',
		  PayPalEnvironmentSandbox: 'ATHY9aVPlbgXKQ_ow-pxxn8phgRHcIRvhsN09L2E4GoFDWWD5eVmUfF4HsQhjhkOJwNrKs-YFp5rf0r5' // sacado de https://developer.paypal.com/developer/applications/edit/QWI3VVNTa2xpMXhWejRQYTQ4UzE2YWtVdEFMZjhrdDdPT2VQdDNRZE1DZkl6M0pxY2FCTGFRREhJZHB0MlpSUzgwejAwZy1OWEZ5djc5NUc=
		}).then(() => {
		  // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
		  this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
		    // Only needed if you get an "Internal Service Error" after PayPal login!
		    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
		  })).then(() => {
		    let payment = new PayPalPayment('0.01', 'EUR', 'Comprando', 'sale');
		    //this.payPal.renderSinglePaymentUI(payment).then(() => {
		    	this.payPal.renderSinglePaymentUI(payment).then(

		    	data => {
						this.dataPaypal = JSON.stringify(data)
						this.dataPaypal = this.dataPaypal.split('"')
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
		    }, () => {
		      // Error or render dialog closed without being successful
		    });
		  }, () => {
		    // Error in configuration
		  });
		}, () => {
		  // Error in initialization, maybe PayPal isn't supported or something else
		});


	*/

	}//FIN PAGO ()










}
