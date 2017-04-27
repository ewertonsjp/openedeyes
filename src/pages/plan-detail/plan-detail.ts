import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { IndicatorPage } from '../indicator/indicator';

/**
 * Generated class for the PlanDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
})
export class PlanDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showDetails() {
    this.navCtrl.push(IndicatorPage);
  }

}
