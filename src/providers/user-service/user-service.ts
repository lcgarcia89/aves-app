import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  getUsers() {
    return this.http.post('http://dev.contanimacion.com/birds/public/login/', {user: 'hello', password: 'world'});
    //return this.http.get('http://dev.contanimacion.com/birds/public/login/');
  }
}
