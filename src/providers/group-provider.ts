import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Measure {
  label: String;
  value: number;

  constructor(label: string, value: number) {
    this.label = label;
    this.value = value;
  }

}

/*
  Generated class for the GroupProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupProvider {

  constructor(public http: Http) {

  }

  get(groupId) {
    return new Promise(resolve => {
      this.http.get('http://localhost:8100/group/' + groupId).map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

  measure(group, measures) {
    let body = {
      measures: measures
    }

    return new Promise(resolve => {
      this.http.post('http://localhost:8100/group/' + group.id + '/measure', body).subscribe(data => {
         resolve(data);
      }, error => {
          console.log("Oooops!");
      });
    });
  }

}
