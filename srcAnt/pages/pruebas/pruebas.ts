import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the PruebasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pruebas',
  templateUrl: 'pruebas.html',
})
export class PruebasPage {

  constructor(
    public viewCtrl: ViewController,
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams) 
    {
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebasPage');
  }

   pushPage() {
      this.navCtrl.push(ListPage);
    }
}
