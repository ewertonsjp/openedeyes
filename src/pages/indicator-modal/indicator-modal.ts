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
    for (let indicator of this.group.indicators) {
      this.values.push({
        "indicator_id":indicator.id,
        "name":indicator.name,
        "date":'2017-05-20',
        "value":"0"
      });
    }
  }

  ionViewDidLoad() {

  }

  closeModal(confirm) {
    this.viewCtrl.dismiss({data:this.values, confirm:confirm});
  }

}
