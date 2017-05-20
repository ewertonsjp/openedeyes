import { Component } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';

import { PlanDetailPage } from '../plan-detail/plan-detail';
import { PlanProvider } from '../../providers/plan-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [PlanProvider]
})
export class HomePage {

  plans;
  loading: Loading;

  constructor(public navCtrl: NavController, public planProvider: PlanProvider, public loadingCtrl: LoadingController) {
    /**show loading*/
    this.loading = this.loadingCtrl.create({
      content: 'Loading...',
      dismissOnPageChange: true
    });

    this.loading.present().then(() => {
      /**loading*/
      this.planProvider.list().then(data => {
        this.plans = data;
      });

      /**dismiss loading*/
      this.loading.dismiss();
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
