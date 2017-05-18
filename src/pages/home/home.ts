import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlanDetailPage } from '../plan-detail/plan-detail';
import { PlanProvider } from '../../providers/plan-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PlanProvider]
})
export class HomePage {

  plans;

  constructor(public navCtrl: NavController, public planProvider: PlanProvider) {
    this.planProvider.list().then(data => {
      this.plans = data;
    });
  }

  ionViewDidLoad() {

  }

  showDetails(planId) {
    this.navCtrl.push(PlanDetailPage, {
      _planId: planId
    });
  }

}
