import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController } from 'ionic-angular';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';
import { Geolocation } from "@ionic-native/geolocation";
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-ave-form',
  templateUrl: 'ave-form.html'
})
export class AveForm implements OnInit {

  status: string;

  birdFormGroup: FormGroup;

  latitude: number;

  longitude: number;

  id_user: string;

  sightingValid: boolean;

  sightingChecked: boolean;



  constructor(public navCtrl: NavController, public birdsService: BirdsServiceProvider, private geolocation: Geolocation, public userService: UserServiceProvider) {

  }

  // form initialised
  ngOnInit() {
    this.birdFormGroup = new FormGroup({
      'birdFormGroup': new FormGroup({
        'name': new FormControl('', [Validators.required,
          Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ]+[A-Za-záéíóúÁÉÍÓÚñÑ ]+$')]),
        'description': new FormControl('', [Validators.required,
          Validators.pattern('^[A-Z0-9a-záéíóúÁÉÍÓÚñÑ().;,_\\\\/\\-:\\?!¿¡+\\\'\\"*= ]*$'),
          Validators.minLength(20)]),
        'chkSighting': new FormControl('false'),
        'place': new FormControl('', [Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ]+[A-Za-záéíóúÁÉÍÓÚñÑ ]*$'),
          Validators.minLength(1)])
      })
    } );

    this.sightingValid = true;
    this.sightingChecked = false;

    this.id_user = this.userService.getLoggedUser();
  }

  getLocation(e: any) {
    if(e.checked) {
      this.sightingChecked = true;
      let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
      this.geolocation.getCurrentPosition(options).then((res) => {
        // resp.coords.latitude
        // resp.coords.longitude
        //let location= 'lat'+ res.coords.latitude +'lang'+ res.coords.longitude;
        //let location='lat '+res.coords.latitude+' lang '+res.coords.longitude;

        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;

        if(this.birdFormGroup.get('birdFormGroup.place').value == '') {
          this.sightingValid = false;
        } else {
          this.sightingValid = true;
        }

        console.log('Got location --- latitude: ' + this.latitude + ' / longitude: ' + this.longitude);

      }).catch((error) => {
        console.log('Error getting location', error);
        this.sightingValid = false;
      });
    }
    else {
      this.sightingChecked = false;
      this.sightingValid = true;
    }
  }

  addBirdForm() {
    console.log('id_user: ' + this.id_user);

    if(this.sightingChecked==true){
      console.log('Latitude: ' + this.latitude);
      console.log('Longitude: ' + this.longitude);
      console.log('Place: ' + this.birdFormGroup.get('birdFormGroup.place').value);
      this.birdsService.postAddBirdWithSighting(this.id_user, this.birdFormGroup.get('birdFormGroup.name').value,
        this.birdFormGroup.get('birdFormGroup.description').value,
        this.birdFormGroup.get('birdFormGroup.place').value,
        this.latitude, this.longitude).subscribe(
        (data) => {
          console.log(data);
          this.status = data['status'];
        },
        (error) =>{
          console.error(error);
        },
        () => {
          console.log('Status: ' + this.status);
          if(this.status == 'OK') {
            console.log('bird with sighting added');
            this.navCtrl.pop();
          }
        }
      )
    } else {
      this.birdsService.postAddBird(this.id_user, this.birdFormGroup.get('birdFormGroup.name').value, this.birdFormGroup.get('birdFormGroup.description').value).subscribe(
        (data) => {
          console.log(data);
          this.status = data['status'];
        },
        (error) => {
          console.error(error);
        },
        () => {
          console.log('Status: ' + this.status);
          if (this.status == 'OK') {
            console.log('bird added');
            this.navCtrl.pop();
          }
        }
      )
    }
  }

  checkValidPlace() {
    if(this.sightingChecked==true) {
      if(this.birdFormGroup.get('birdFormGroup.place').value == '') {
        this.sightingValid=false;
      }
      else {
        this.sightingValid=true;
      }
    }
  }

}
