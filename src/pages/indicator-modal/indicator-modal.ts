import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the IndicatorModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-indicator-modal',
  templateUrl: 'indicator-modal.html',
})
export class IndicatorModalPage {

  group: any = this.navParams.get('group');
  values = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewCtrl.dismiss({data:this.values});
  }

}
