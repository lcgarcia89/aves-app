import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';
import { DetalleAve } from "../detalle-ave/detalle-ave";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { AveForm } from "../añadir-ave/ave-form";

@Component({
  selector: 'page-lista-aves',
  templateUrl: 'lista-aves.html'
})
export class ListaAves implements OnInit {

  birds: Array<{id: string, name: string, image: string, sightings: string, mine: number}>

  status: string;

  id_user: string;


  constructor(public navCtrl: NavController, public birdsService: BirdsServiceProvider, public userService: UserServiceProvider,
              public loadingCtrl: LoadingController) {
  }

  // form initialised
  ngOnInit() {
    this.id_user = this.userService.getLoggedUser();

  }

  birdTapped(event, bird) {
    this.navCtrl.push(DetalleAve, {bird_id: bird.id});
  }


  anadirAve(){
    this.navCtrl.push(AveForm);
  }


  ionViewWillEnter(){
    this.birds = [];
    let loading = this.loadingCtrl.create({content: 'Cargando...'});
    loading.present();
    this.birdsService.getBirds(this.id_user).subscribe(
      (data) => {
        loading.dismissAll();
        data.forEach( bird => {
          this.birds.push({id: bird.id, name: bird.bird_name, image: bird.bird_image, sightings: bird.bird_sightings, mine: bird.mine});
        });
      },
      error => {
        console.log(error);
        loading.dismissAll();
      }
    )
  }
}
