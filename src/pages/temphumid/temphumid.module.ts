import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemphumidPage } from './temphumid';

@NgModule({
  declarations: [
    TemphumidPage,
  ],
  imports: [
    IonicPageModule.forChild(TemphumidPage),
  ],
})
export class TemphumidPageModule {}
