import { NgModule } from '@angular/core';
//import { IonicApp, IonicModule} from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { AreaclientePage } from './areacliente';

@NgModule({
  declarations: [
    AreaclientePage,
  ],
  imports: [
    IonicPageModule.forChild(AreaclientePage),
  ],
})
export class AreaclientePageModule {}

