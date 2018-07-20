import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the CompieComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'compie',
  templateUrl: 'compie.html'
})
export class CompieComponent {

  text: string;

  constructor(
  	    public navCtrl: NavController
  	    ) {

  }

 goBack(){
    this.navCtrl.pop();
  }
}
