import {Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
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



  constructor(public navCtrl: NavController, public birdsService: BirdsServiceProvider, private geolocation: Geolocation,
              public userService: UserServiceProvider, public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

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
        let toast = this.toastCtrl.create({message: 'No se ha podido obtener la localización del dispositivo', showCloseButton:true, closeButtonText: 'Ok'});
        toast.present();
        this.sightingValid = false;
      });
    }
    else {
      this.sightingChecked = false;
      this.sightingValid = true;
    }
  }

  addBirdForm() {
    let loading = this.loadingCtrl.create({content: 'Cargando...'});
    loading.present();
    if(this.sightingChecked==true){
      console.log('Latitude: ' + this.latitude);
      console.log('Longitude: ' + this.longitude);
      console.log('Place: ' + this.birdFormGroup.get('birdFormGroup.place').value);
      this.birdsService.postAddBirdWithSighting(this.id_user, this.birdFormGroup.get('birdFormGroup.name').value,
        this.birdFormGroup.get('birdFormGroup.description').value,
        this.birdFormGroup.get('birdFormGroup.place').value,
        this.latitude, this.longitude).subscribe(
        (data) => {
          loading.dismissAll();
          console.log(data);
          this.status = data['status'];
        },
        (error) =>{
          loading.dismissAll();
          console.error(error);
          let toast = this.toastCtrl.create({message: 'Ha ocurrido un error', duration: 3000, position: 'bottom'});
          toast.present();
        },
        () => {
          console.log('Status: ' + this.status);
          if(this.status == 'OK') {
            console.log('bird with sighting added');
            let toast = this.toastCtrl.create({message: 'El ave ha sido añadida', duration: 3000, position: 'bottom'});
            toast.present();
            this.navCtrl.pop();
          }
        }
      )
    } else {
      this.birdsService.postAddBird(this.id_user, this.birdFormGroup.get('birdFormGroup.name').value, this.birdFormGroup.get('birdFormGroup.description').value).subscribe(
        (data) => {
          loading.dismissAll();
          console.log(data);
          this.status = data['status'];
        },
        (error) => {
          loading.dismissAll();
          console.error(error);
          let toast = this.toastCtrl.create({message: 'Ha ocurrido un error', duration: 3000, position: 'bottom'});
          toast.present();
        },
        () => {
          console.log('Status: ' + this.status);
          if (this.status == 'OK') {
            console.log('bird added');
            console.log('bird with sighting added');
            let toast = this.toastCtrl.create({message: 'El ave ha sido añadida', duration: 3000, position: 'bottom'});
            toast.present();
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
