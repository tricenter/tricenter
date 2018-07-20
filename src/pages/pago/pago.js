var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
/**
 * Generated class for the PagoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PagoPage = /** @class */ (function () {
    function PagoPage(navCtrl, navParams, payPal) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.payPal = payPal;
        this.payment = new PayPalPayment('0.01', 'EUR', 'Pago por PayPal a Tricenter', 'sale');
        this.currencies = ['EUR', 'USD'];
        this.payPalEnvironment = 'payPalEnvironmentSandbox';
    }
    PagoPage.prototype.pagar = function () {
        var _this = this;
        this.payPal.init({
            PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
            PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
        }).then(function () {
            // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
            // Only needed if you get an "Internal Service Error" after PayPal login!
            //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
            })).then(function () {
                var payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
                _this.payPal.renderSinglePaymentUI(payment).then(function () {
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
                }, function () {
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
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
    }; //FIN PAGO ()
    PagoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-pago',
            templateUrl: 'pago.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, PayPal])
    ], PagoPage);
    return PagoPage;
}());
export { PagoPage };
//# sourceMappingURL=pago.js.map