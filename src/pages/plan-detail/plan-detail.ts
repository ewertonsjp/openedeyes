import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ModalController } from 'ionic-angular';
import { PlanProvider } from '../../providers/plan-provider';
import { IndicatorPage } from '../indicator/indicator';
import { GroupModalPage } from '../group-modal/group-modal';
import { GroupProvider } from '../../providers/group-provider';

/**
 * Generated class for the PlanDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
  providers: [PlanProvider, GroupProvider]
})
export class PlanDetailPage {

  plan:any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public planProvider: PlanProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public groupProvider: GroupProvider) {
    this.loadPlan(this.navParams.get("_planId"));
  }

  loadPlan(planId) {
    /**show loading*/
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present().then(() => {
      this.planProvider.get(planId).then(data => {
        this.plan = data;
        this.loading.dismiss();
      });
    });
  }

  showDetails(group) {
    this.navCtrl.push(IndicatorPage, {
      _groupId: group.id
    });
  }

  openModal(groupId) {
    let myModal = this.modalCtrl.create(GroupModalPage, {
      "groupId":groupId
    });

    myModal.onDidDismiss(data => {
      if (data.confirm) {
        if (!data.data.id) {
          this.groupProvider.add(this.plan.id, data.data).then(_data => {
            this.loadPlan(this.plan.id);
          });
        } else {
          console.log('Oooopsss. Aqui não é lugar de EDIT! ;(')
        }
      }
    });

    myModal.present();
  }

}
