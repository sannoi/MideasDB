import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemModel } from '../../models/item-model';

@IonicPage()
@Component({
  selector: 'page-item-info',
  templateUrl: 'item-info.html',
})
export class ItemInfoPage {

  item: ItemModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.item = this.navParams.get("item");
  }

  ionViewDidLoad() {
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
