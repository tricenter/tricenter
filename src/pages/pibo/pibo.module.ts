import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PiboPage } from './pibo';

@NgModule({
  declarations: [
    PiboPage,
  ],
  imports: [
    IonicPageModule.forChild(PiboPage),
  ],
})
export class PiboPageModule {}
