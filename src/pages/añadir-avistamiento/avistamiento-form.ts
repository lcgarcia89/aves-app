import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-avistamiento-form',
  templateUrl: 'avistamiento-form.html'
})
export class Avistamiento implements OnInit{

  sightingFormGroup: FormGroup;

  locationReady: boolean;

  disableButton: boolean;



  constructor(public navCtrl: NavController, private geolocation: Geolocation, public toastCtrl: ToastController) {
    //this.locationReady = false;
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      console.log("navigator.geolocation works well");
      //this.getLocation();
      return true;
    }

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

    this.disableButton = true;
    this.getLocation();
  }


  getLocation(){

    alert("getLocation");
    this.geolocation.getCurrentPosition().then((res) => {
      // resp.coords.latitude
      // resp.coords.longitude
      //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
      let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;
      // let toast = this.toastCtrl.create({
      //   message: location,
      //   duration: 3000
      // });
      // toast.present();

      alert(location);

      this.locationReady = true;

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
