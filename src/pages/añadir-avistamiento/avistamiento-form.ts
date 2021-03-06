import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';


@Component({
  selector: 'page-avistamiento-form',
  templateUrl: 'avistamiento-form.html'
})
export class Avistamiento implements OnInit{

  sightingFormGroup: FormGroup;

  locationReady: boolean;

  bird_id: string;

  latitude: number;

  longitude: number;



  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
              public birdsService: BirdsServiceProvider, public toastCtrl: ToastController,
              public loadingCtrl: LoadingController) {

  }


  sightingForm() {

    let loading = this.loadingCtrl.create({content: 'Cargando...'});
    loading.present();
    this.birdsService.postSighting(this.bird_id, this.sightingFormGroup.get('sighting.place').value, this.latitude, this.longitude).subscribe(
      (data) => {
        let status = data ['status'];
        loading.dismissAll();
        if(status=='OK'){
          console.log('sighting added');
          let toast = this.toastCtrl.create({message: 'El avistamiento ha sido añadido', duration: 3000, position: 'bottom'});
          toast.present();
          this.navCtrl.pop();
        }
        if(status=='KO'){
          console.log('error adding sighting');
          let toast = this.toastCtrl.create({message: 'Error en la petición', duration: 3000, position: 'bottom'});
          toast.present();
        }
      },
        (error) =>{
          loading.dismissAll();
          console.error(error);
          let toast = this.toastCtrl.create({message: 'Ha ocurrido un error', duration: 3000, position: 'bottom'});
          toast.present();
        }
    )
  }


  // form initialised
  ngOnInit() {
    this.bird_id = this.navParams.get('bird_id');

    this.sightingFormGroup = new FormGroup({
      'sighting': new FormGroup({
        'place': new FormControl('', [Validators.required, Validators.pattern('^[A-Za-záéíóúÁÉÍÓÚñÑ]+[A-Za-záéíóúÁÉÍÓÚñÑ ]*$')])
      })
    } );

    this.getLocation();
  }


  getLocation(){

    let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
    this.geolocation.getCurrentPosition(options).then((res) => {

      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;

      console.log('Got location --- latitude: ' + this.latitude + ' / longitude: ' + this.longitude);

      this.locationReady = true;

    }).catch((error) => {
      let toast = this.toastCtrl.create({message: 'No se ha podido obtener la localización del dispositivo', showCloseButton:true, closeButtonText: 'Ok'});
      toast.present();
      console.log('Error getting location', error);
    });
  }

}
