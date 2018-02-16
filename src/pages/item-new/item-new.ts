import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ItemModel } from '../../models/item-model';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';

import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-item-new',
  templateUrl: 'item-new.html',
})
export class ItemNewPage {

  title: string;
  description: string;
  image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public itemsService: ItemsServiceProvider,
    public cameraService: CameraServiceProvider) { }

  ionViewDidLoad() {
    this.title = '';
    this.description = '';
    this.image = 'assets/imgs/logo.png';
  }

  saveItem() {
    if (this.title && this.title.trim() != '' && this.description && this.description.trim() != '') {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      let item = new ItemModel(this.title, this.description, this.image);
      this.itemsService.add(item).then(result => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
    }
  }

  getFromCamera() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraService.getPictureFromCamera().then(picture => {
      if (picture) {
        this.image = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  getFromGallery() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraService.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.image = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

}
