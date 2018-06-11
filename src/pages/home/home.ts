import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController, LoadingController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { User } from '../../model/user';
import { MainMenu } from "../main-menu/main-menu";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  loginFormGroup: FormGroup;

  user: User;

  status: string;
  id_user: string;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public loadingCtrl: LoadingController) {

  }

  loginForm() {
    let loading = this.loadingCtrl.create({content: 'Cargando...'});
    loading.present();
    this.userService.getUsers(this.loginFormGroup.get('user.email').value, this.loginFormGroup.get('user.password').value).subscribe(
      (data) => {
        this.id_user = data['id'];
        this.status = data['status'];
        loading.dismissAll();
        if(this.status=='OK'){
          console.log('Logged user with id: ' + this.id_user);
          this.userService.loginUser(this.id_user);
          this.navCtrl.push(MainMenu, {id: this.id_user});
        }
      },
        (error) =>{
          loading.dismissAll();
          console.error(error);
        }
    )
  }


  // form initialised
  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'user': new FormGroup({
        'email': new FormControl('', [Validators.required,
          Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')]),
        'password': new FormControl('', [Validators.required,
          Validators.pattern('^[ A-Za-z0-9_@./#&+-]+$'), Validators.minLength(4)])
      })
    } );
  }

}
