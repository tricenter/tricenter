import { NgModule } from '@angular/core';
//import { IonicApp, IonicModule} from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { DatosPage } from './datos';
//import { HomePage } from '../../pages/home/home';

@NgModule({
  declarations: [
    DatosPage,
  ],
  imports: [

    IonicPageModule.forChild(DatosPage),
  ],
})
export class DatosPageModule {}
