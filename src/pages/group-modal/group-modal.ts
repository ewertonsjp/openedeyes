import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupProvider } from '../../providers/group-provider';

/**
 * Generated class for the GroupModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-group-modal',
  templateUrl: 'group-modal.html',
  providers: [GroupProvider]
})
export class GroupModalPage {

  group;
  groupId: any = this.navParams.get('groupId');

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public groupProvider: GroupProvider) {
    this.group = {
      name:"",
      indicators: [
        {id:"", name:""}
      ]
    }

    if (this.groupId) {
      this.groupProvider.get(this.groupId).then(data => {
        this.group = data;
      });
    }
  }

  addIndicator() {
    this.group.indicators.push({"name":""});
  }

  closeModal(confirm) {
    this.viewCtrl.dismiss({data:this.group, confirm:confirm});
  }

}
