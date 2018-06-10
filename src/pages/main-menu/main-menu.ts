import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../model/user';
import { ListaAves } from "../lista-aves/lista-aves";
import { AveForm } from "../añadir-ave/ave-form";
import { HomePage } from "../home/home";


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenu{


  user: User;

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {

  }

  listaAves(){
    this.navCtrl.push(ListaAves);
  }

  anadirAve(){
    this.navCtrl.push(AveForm);
  }

  informacion(){
    console.log('Info button pressed, but nothing happened');
    return;
  }

  logout(){
    this.userService.logoutUser();

    this.navCtrl.setRoot(HomePage);
  }

}
