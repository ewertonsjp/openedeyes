import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlanDetailPage } from '../plan-detail/plan-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showDetails() {
    this.navCtrl.push(PlanDetailPage);
  }

}
