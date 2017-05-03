import { Injectable } from '@angular/core';

export class Indicator {
  name: string;
  description: string;
  measures: Measure[];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.measures = [];
  }

  addMeasure(label: string, value: number) {
    let measure = new Measure(label, value);
    this.measures.push(measure);
  }

}

export class Measure {
  label: String;
  value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

}

/*
  Generated class for the IndicatorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IndicatorProvider {

  indicator;

  constructor() {
    this.indicator = new Indicator("Sqls Inconsistentes","...");
    this.indicator.addMeasure('Jan2017', 3);
    this.indicator.addMeasure('Fev2017', 4);
    this.indicator.addMeasure('Mar2017', 5);
    this.indicator.addMeasure('Abr2017', 7);
    this.indicator.addMeasure('Mai2017', 6);
  }

  get(indicatorId) {
    return this.indicator;
  }

  add(value: number) {
    this.indicator.addMeasure('Jun2016', value);
  }

}
