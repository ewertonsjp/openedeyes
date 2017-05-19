import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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

}
