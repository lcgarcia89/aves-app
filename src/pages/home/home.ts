import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {

  }


  validateLogin() {

  }

  loginForm() {
    console.log('Email from form: ' + this.loginFormGroup.get('user.email').value);
    this.userService.getUsers().subscribe(
      (data) => {
        console.log(data);
        this.id_user = 'asfd';
        this.status = data ['status'];
        if(this.status=='OK'){
          this.navCtrl.push(MainMenu);
        }
      },
        (error) =>{
          console.error(error);
        }
    )
  }


  // form initialised
  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      'user': new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+[A-Za-z ]+$')])
      })
    } );
  }

  // ionViewDidLoad(){
  //   this.userService.getUsers()
  //     .subscribe(
  //       (data) => { // Success
  //         this.users = data['results'];
  //       },
  //       (error) =>{
  //         console.error(error);
  //       }
  //     )
  // }
}
