import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemNewPage } from './item-new';

@NgModule({
  declarations: [
    ItemNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemNewPage),
  ],
})
export class ItemNewPageModule {}
