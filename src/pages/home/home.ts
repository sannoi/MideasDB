import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';
import { ItemModel } from '../../models/item-model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: ItemModel[];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastService: ToastServiceProvider,
    public itemsService: ItemsServiceProvider) {

  }

  ionViewDidEnter() {
    if (!this.items) {
      this.initializeItems();
    }
  }

  filterItems(ev: any) {
    // Reset items back to all of the items
    return this.itemsService.getAll().then(items => {
      this.items = items;
      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = items.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        return this.items;
      }
    });
  }

  viewItem(item: ItemModel) {
    this.navCtrl.push('ItemInfoPage', {item: item});
  }

  newItem() {
    this.navCtrl.push('ItemNewPage');
  }

  removeItem(item: ItemModel) {
    let confirm = this.alertCtrl.create({
      title: 'Borrar elemento',
      message: '¿Seguro que quieres borrar el elemento ' + item.title + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            //console.log('Disagree clicked');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            //console.log('Agree clicked');
            this.itemsService.remove(item.id).then(result => {
              this.initializeItems();
              this.toastService.showMessage("Item borrado correctamente");
            });
          }
        }
      ]
    });
    confirm.present();
  }

  initializeItems() {
    this.itemsService.getAll().then(items => {
      this.items = items;
      if (!this.items) {
        this.fillTestItems();
      }
    });
  }

  fillTestItems() {
    let item1 = new ItemModel('Item 1', 'My custom item 1', 'assets/imgs/logo.png');
    let item2 = new ItemModel('Item 2', 'My custom item 2', 'assets/imgs/logo.png');
    let item3 = new ItemModel('Item 3', 'My custom item 3', 'assets/imgs/logo.png');

    this.itemsService.add(item1).then(() => {
      this.itemsService.add(item2).then(() => {
        this.itemsService.add(item3).then(result => {
          this.items = result;
        });
      });
    });
  }

  parseTwitterDate(time: string){
		var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
			diff = (((new Date()).getTime() - date.getTime()) / 1000),
			day_diff = Math.floor(diff / 86400);

		if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
			return;

		return day_diff == 0 && (
				diff < 60 && "ahora mismo" ||
				diff < 120 && "hace 1 minuto" ||
				diff < 3600 && "hace " + Math.floor( diff / 60 ) + " minutos" ||
				diff < 7200 && "hace 1 hora" ||
				diff < 86400 && "hace " + Math.floor( diff / 3600 ) + " horas") ||
			day_diff == 1 && "ayer" ||
			day_diff < 7 && "hace " + day_diff + " días" ||
			day_diff < 31 && "hace " + Math.ceil( day_diff / 7 ) + " semanas";
	}

}
