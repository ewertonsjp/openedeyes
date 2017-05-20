import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan-provider';
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
  providers: [PlanProvider]
})
export class PlanDetailPage {

  plan:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public planProvider: PlanProvider) {
    planProvider.get(navParams.get("_planId")).then(data => {
      this.plan = data;
    });
  }

  showDetails(indicatorId) {
    this.navCtrl.push(IndicatorPage);
  }

}
