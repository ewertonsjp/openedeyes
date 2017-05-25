import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the GroupModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-group-modal',
  templateUrl: 'group-modal.html'
})
export class GroupModalPage {

  group;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.group = {
      name:"",
      indicators: [
        {name:""}
      ]
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupModal');
  }

  addIndicator() {
    this.group.indicators.push({"name":""});
  }

  closeModal(confirm) {
    this.viewCtrl.dismiss({data:this.group, confirm:confirm});
  }

}
