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
  date: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    for (let indicator of this.group.indicators) {
      this.date = new Date().toISOString().split('T')[0];
      this.values.push({
        "indicator_id":indicator.id,
        "name":indicator.name,
        "date":"",
        "value":"0"
      });
    }
  }

  ionViewDidLoad() {

  }

  closeModal(confirm) {
    for (let _value of this.values) {
      _value.date = this.date;
    }
    console.log(this.values);
    this.viewCtrl.dismiss({data:this.values, confirm:confirm});
  }

}
