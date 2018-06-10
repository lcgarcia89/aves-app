import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserServiceProvider {


  // Store data

  PERSISTENT_OBJECT_KEY = 'userID';

  id_user: string;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('UserServiceProvider Provider started');
    this.checkUser();
  }

  getUsers(user: string, password: string) {
    return this.http.post('http://dev.contanimacion.com/birds/public/login/', {user: user, password: password});
  }


  loginUser(idUser: string) {
    this.storage.set(this.PERSISTENT_OBJECT_KEY, idUser);
    this.id_user = idUser;
  }

  logoutUser() {
    this.storage.set(this.PERSISTENT_OBJECT_KEY, "");
  }

  getLoggedUser() {
    return this.id_user;
  }


  checkUser() {
    let storedData: any;

    storedData = this.storage.get(this.PERSISTENT_OBJECT_KEY);

    if ( storedData ) {
      console.log('//DATA STORED');
      this.storage.set(this.PERSISTENT_OBJECT_KEY, "");
    } else {
      console.log('//NO DATA STORED');
      this.storage.set(this.PERSISTENT_OBJECT_KEY, "");
    }
  }

}
