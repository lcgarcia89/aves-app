import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../model/user';
import {ListaAves} from "../lista-aves/lista-aves";


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenu{

  loginFormGroup: FormGroup;

  user: User;

  status: string;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {

  }

  listaAves(){
    this.navCtrl.push(ListaAves);
  }


}
