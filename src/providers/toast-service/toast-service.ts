import { ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastServiceProvider {

  constructor(public toastCtrl: ToastController) { }

  showMessage(text: string, duration?: number) {
    let dur = 3000;
    if (duration) {
      dur = duration;
    }

    let toast = this.toastCtrl.create({
      message: text,
      duration: dur,
      position: 'top'
    });
    toast.present();
  }

}
