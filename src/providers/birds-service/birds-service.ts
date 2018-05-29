import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BirdsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BirdsServiceProvider Provider');
  }

  getBirds() {
    return this.http.get<any[]>('http://dev.contanimacion.com/birds/public/getBirds/d');
    //return this.http.get('http://dev.contanimacion.com/birds/public/login/');
  }

  getBirdDetail(id: string){
    return this.http.get('http://dev.contanimacion.com/birds/public/getBirdDetails/' + id);
  }
}
