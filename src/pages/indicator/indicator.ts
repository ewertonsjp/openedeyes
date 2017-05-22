import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { IndicatorProvider } from '../../providers/indicator-provider';
import { GroupProvider } from '../../providers/group-provider';

import { IndicatorModalPage } from '../indicator-modal/indicator-modal';

/**
 * Generated class for the Indicator page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-indicator',
  templateUrl: 'indicator.html',
  providers: [IndicatorProvider, GroupProvider]
})
export class IndicatorPage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  group: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public indicatorProvider: IndicatorProvider, public modalCtrl: ModalController, public groupProvider: GroupProvider, public loadingCtrl: LoadingController) {
    this.loadChart(navParams.get("_groupId"));
  }

  loadChart(groupId) {
    /**show loading*/
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });

    this.loading.present().then(() => {
      this.groupProvider.get(groupId).then(data => {
        this.group = data;

        let _labels = this.dailyLabels(this.group);
        let _datasets = [];

        for (let _indicator of this.group.indicators) {
            let _map = new Map();
            for (let _label of _labels) {
                _map.set(_label,0);
            }
            for (let _measure of _indicator.measures) {
                _map.set(_measure.assembled_at,_measure.value);
            }

            let _color = this.dynamicColors();
            _datasets.push({
              label: _indicator.name,
              fill: false,
              lineTension: 0.1,
              backgroundColor: _color,
              borderColor: _color,
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: _color,
              pointBackgroundColor: _color,
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: _color,
              pointHoverBorderColor: _color,
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: Array.from(_map.values()),
              spanGaps: false
            });
        }

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: _labels,
                datasets: _datasets
            },
            options: {
              legend: {
                  position: 'bottom',
              }
            }
        });

        this.loading.dismiss();

      });

    });

  }

  openModal() {
    let myModal = this.modalCtrl.create(IndicatorModalPage, {'group':this.group});

    myModal.onDidDismiss(data => {
      if (data.confirm) {
        this.groupProvider.measure(this.group, data.data).then(data => {
          this.loadChart(this.group.id);
        });
      }
    });

    myModal.present();
  }

  dailyLabels(group) {
    let _labels = new Set();
    for (let indicator of group.indicators) {
      for (let measure of indicator.measures) {
        _labels.add(measure.assembled_at);
      }
    }
    return Array.from(_labels).sort();
  }

  dynamicColors() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

}
