import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanProvider {

  plans;

  constructor(public http: Http) {

  }

  list() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8100/plan').map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

  get(planId) {
    return new Promise(resolve => {
      this.http.get('http://localhost:8100/plan/' + planId).map(res => res.json()).subscribe(data => {
          resolve(data);
      });
    });
  }

}
