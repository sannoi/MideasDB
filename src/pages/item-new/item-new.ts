import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemModel } from '../../models/item-model';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-item-new',
  templateUrl: 'item-new.html',
})
export class ItemNewPage {

  title: string;
  description: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public itemsService: ItemsServiceProvider) { }

  ionViewDidLoad() {
    this.title = '';
    this.description = '';
  }

  saveItem() {
    if (this.title && this.title.trim() != '' && this.description && this.description.trim() != '') {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      let item = new ItemModel(this.title, this.description, 'assets/imgs/logo.png');
      this.itemsService.add(item).then(result => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
    }
  }

}
