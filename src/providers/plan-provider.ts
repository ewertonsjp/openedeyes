import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanProvider {

  plans;

  constructor(public http: Http) {
    console.log('Hello PlanProvider Provider');
  }

  list() {
    return new Promise(resolve => {
      this.http.get('http://localhost:8100/plan').map(res => res.json()).subscribe(data => {
          console.log(data);
          resolve(data);
      });
    });
  }

}
