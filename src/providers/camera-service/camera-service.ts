import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable()
export class CameraServiceProvider {

  constructor(private camera: Camera, private barcodeScanner: BarcodeScanner) {
  }

  getBarcodeScan() {
    return this.barcodeScanner.scan().then((barcodeData) => {
      return barcodeData;
    }, (err) => {
      console.log('BARCODE SCAN ERROR -> ' + JSON.stringify(err));
    });
  }

  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA, true);
  }

  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  // This method takes optional parameters to make it more customizable
  getImage(pictureSourceType, crop = false, quality = 50, allowEdit = true, saveToAlbum = true) {
    const options: CameraOptions = {
      quality,
      allowEdit,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: pictureSourceType,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: saveToAlbum
    };

    // If set to crop, restricts the image to a square of 600 by 600
    if (crop) {
      options['targetWidth'] = 600;
      options['targetHeight'] = 600;
    }

    return this.camera.getPicture(options).then(imageData => {
      //const base64Image = 'data:image/png;base64,' + imageData;
      return imageData;
    }, error => {
      console.log('CAMERA ERROR -> ' + JSON.stringify(error));
    });
  }
}
