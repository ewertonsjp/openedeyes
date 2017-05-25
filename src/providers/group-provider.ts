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

  BASE_URL = "https://safe-everglades-60916.herokuapp.com/group";

  constructor(public http: Http) {

  }

  get(groupId) {
    return new Promise(resolve => {
      this.http.get(this.BASE_URL + '/' + groupId).map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

  measure(group, measures) {
    let body = {
      measures: measures
    }

    return new Promise(resolve => {
      this.http.post(this.BASE_URL + '/' + group.id + '/measure', body).subscribe(data => {
         resolve(data);
      }, error => {
          console.log("Oooops!");
      });
    });
  }

  add(planId, group) {
    let body = {
      planId: planId,
      group: group
    }

    return new Promise(resolve => {
      this.http.post(this.BASE_URL, body).subscribe(data => {
        resolve(data);
      }, error => {
          console.log("Oooops!");
      });
    });
  }

  edit(group) {
    let body = {
      group: group
    }

    return new Promise(resolve => {
      this.http.post(this.BASE_URL + '/' + group.id + '/edit', body).subscribe(data => {
        resolve(data);
      }, error => {
          console.log("Oooops!");
      });
    });

  }
}
