import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TiendasPage } from './tiendas';

@NgModule({
  declarations: [
    TiendasPage,
  ],
  imports: [
    IonicPageModule.forChild(TiendasPage),
  ],
})
export class TiendasPageModule {}
