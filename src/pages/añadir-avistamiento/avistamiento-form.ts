import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-avistamiento-form',
  templateUrl: 'avistamiento-form.html'
})
export class Avistamiento implements OnInit{

  sightingFormGroup: FormGroup;

  locationReady = false;



  constructor(public navCtrl: NavController) {

  }


  sightingForm() {
    console.log('Place from form: ' + this.sightingFormGroup.get('sighting.place').value);
    // this.userService.getUsers().subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.id_user = 'asfd';
    //     this.status = data ['status'];
    //     if(this.status=='OK'){
    //       this.navCtrl.push(MainMenu);
    //     }
    //   },
    //     (error) =>{
    //       console.error(error);
    //     }
    // )
  }


  // form initialised
  ngOnInit() {
    this.sightingFormGroup = new FormGroup({
      'sighting': new FormGroup({
        'place': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+[A-Za-z ]+$')])
      })
    } );


    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      alert("navigator.geolocation works well");
      console.log("navigator.geolocation works well");
      this.locationReady = true;
    }
  }


  addSighting() {

  }



}
