import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ItemModel } from '../../models/item-model';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';

import { Marca } from '../../models/marca';
import { MarcasProvider } from '../../providers/marcas/marcas';

/**
 * Generated class for the SelectCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-card',
  templateUrl: 'select-card.html',
})
export class SelectCardPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public marcas: MarcasProvider, public items: ItemsServiceProvider, public modalCtrl: ModalController) {
    this.currentItems = this.marcas.query();
  }

    /**
     * Perform a service for the proper items.
     */
    getItems(ev) {
      let val = ev.target.value;
      if (!val || !val.trim()) {
        this.currentItems = [];
        return;
      }
      this.currentItems = this.marcas.query({
        name: val
      });
    }

    /**
     * Navigate to the detail page for this item.
     */

    openItem(marca: Marca) {
      console.log(marca);

      this.viewCtrl.dismiss('addModal');
      let addModal = this.modalCtrl.create('ItemNewPage', {
        marca: marca
      });
      addModal.onDidDismiss(item => {
        console.log('item'+item)
        if (item) {
          this.items.add(item);
        }
      })
      addModal.present();

      // this.navCtrl.push('ItemCreatePage', {
      //   marca: marca
      // });
    }

      ionViewDidLoad() {
        console.log('ionViewDidLoad SelectCardPage');
      }

  }
