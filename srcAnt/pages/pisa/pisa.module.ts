import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PisaPage } from './pisa';

@NgModule({
  declarations: [
    PisaPage,
  ],
  imports: [
    IonicPageModule.forChild(PisaPage),
  ],
})
export class PisaPageModule {}
