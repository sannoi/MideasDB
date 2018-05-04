import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../../models/item-model';
import { ItemsServiceProvider } from '../../providers/items-service/items-service';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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
  barcode: any;
  barcodeText: any;
  encodedData : {} ;
  item: any;
  marca: any;
  form: FormGroup;
  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    formBuilder: FormBuilder,
    public itemsService: ItemsServiceProvider,
    private barcodeScanner: BarcodeScanner,
    public cameraService: CameraServiceProvider) {

      this.marca = navParams.get('marca');
      console.log(this.marca.name);
      console.log('custom:'+this.marca.custom);

      this.form = formBuilder.group({
        image: [this.marca.img],
        title: [this.marca.name, Validators.required],
        description: [this.marca.description],
        type: [this.marca.type],
        color: [this.marca.color],
        code: [this.marca.code],
        format: [this.marca.format],
        code_image: [this.marca.code_image],
        category: [this.marca.category],
        custom: [this.marca.custom],
        image_back: [this.marca.image_back],
        image_front: [this.marca.image_front],
      });

      // Watch the form for changes, and
      this.form.valueChanges.subscribe((v) => {
        this.isReadyToSave = this.form.valid;
      });

    }

  ionViewDidLoad() {
    //this.title = '';
    //this.description = '';
    //this.image = 'assets/imgs/logo.png';
    this.image = this.marca.img;
    this.title = this.marca.name;
    this.description = this.marca.description;
    this.type = this.marca.type;
    this.color = this.marca.color;
    this.code = this.marca.code;
    this.format = this.marca.format;
    this.code_image = this.marca.code_image;
    this.category = this.marca.category;
    this.custom = this.marca.custom;
    this.image_back = this.marca.image_back;
    this.image_front = this.marca.image_front;

    if(this.marca.type=='barcode'){
      this.getFromBarcodeScanner();
    } else if(this.marca.type=='qr'){
    } else if(this.marca.type=='ocr'){
    }

  }

  saveItem() {
    if (this.title && this.title.trim() != '' && this.description && this.description.trim() != '') {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      let item = new ItemModel(this.title, this.description, this.image, { barcode: this.barcode });
      this.itemsService.add(item).then(result => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
    }
  }

  getFromBarcodeScanner() {
    const loading = this.loadingCtrl.create();

    loading.present();

    return this.barcodeScanner.scan().then(barcodeData => {
     console.log('Barcode data', barcodeData);
     console.log(JSON.stringify(barcodeData));

     if (barcodeData && !barcodeData.cancelled) {
       this.barcode = barcodeData;
       this.barcodeText = barcodeData.format + ": " + barcodeData.text;
     }

     loading.dismiss();
    }).catch(err => {
        console.log('Error', err);
    });

  }

  encodeText(){
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.barcodeText).then((encodedData) => {
          console.log(encodedData);
          this.encodedData = encodedData;

      }, (err) => {
          console.log("Error occured : " + err);
      });
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
