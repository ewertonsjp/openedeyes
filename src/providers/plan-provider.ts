import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanProvider {

  BASE_URL = "https://safe-everglades-60916.herokuapp.com/plan";
  plans;

  constructor(public http: Http) {

  }

  list() {
    return new Promise(resolve => {
      this.http.get(this.BASE_URL).map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

  get(planId) {
    return new Promise(resolve => {
      this.http.get(this.BASE_URL + '/' + planId).map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

}
