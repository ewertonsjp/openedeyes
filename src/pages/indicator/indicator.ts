import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Chart } from 'chart.js';
import { IndicatorProvider } from '../../providers/indicator-provider';

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
  providers: [IndicatorProvider]
})
export class IndicatorPage {

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public indicatorProvider: IndicatorProvider, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadChart();
  }

  loadChart() {
    let indicator = this.indicatorProvider.get(1);
    let labels = [];
    let data = [];

    for (let measure of indicator.measures) {
      labels.push(measure.label);
      data.push(measure.value);
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: indicator.name,
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: data,
                    spanGaps: false,
                }
            ]
        }
    });
  }

  openModal() {
    let myModal = this.modalCtrl.create(IndicatorModalPage);

    myModal.onDidDismiss(data => {
      this.indicatorProvider.add(data.value);
      this.loadChart();
    });

    myModal.present();
  }
}
