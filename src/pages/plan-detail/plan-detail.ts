import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, ModalController, Platform, ActionSheetController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public planProvider: PlanProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public groupProvider: GroupProvider, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
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

  showDetails(groupId) {
    this.navCtrl.push(IndicatorPage, {
      _groupId: groupId
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
          this.groupProvider.edit(data.data).then(_data => {
            this.loadPlan(this.plan.id);
          });
        }
      }
    });

    myModal.present();
  }

  openMenu(group) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Opções',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Ver Gráfico',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            this.showDetails(group.id);
          }
        },
        {
          text: 'Editar',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            this.openModal(group.id);
          }
        }
      ]
    });
    actionSheet.present();
  }

}
