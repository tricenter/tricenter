import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosclientePage } from './datoscliente';

@NgModule({
  declarations: [
    DatosclientePage,
  ],
  imports: [
    IonicPageModule.forChild(DatosclientePage),
  ],
})
export class DatosclientePageModule {}
