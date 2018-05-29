import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';
import { DetalleAve } from "../detalle-ave/detalle-ave";

@Component({
  selector: 'page-lista-aves',
  templateUrl: 'lista-aves.html'
})
export class ListaAves implements OnInit {

  birds: Array<{id: string, name: string, image: string, sightings: string, mine: number}>

  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public birdsService: BirdsServiceProvider) {

  }

  // form initialised
  ngOnInit() {
    this.birds = [];
    this.birdsService.getBirds().subscribe(
      (data) => {
        data.forEach( bird => {
          this.birds.push({id: bird.id, name: bird.bird_name, image: bird.bird_image, sightings: bird.bird_sightings, mine: bird.mine});
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  birdTapped(event, bird) {
    console.log(bird.id);
    this.navCtrl.push(DetalleAve, {bird_id: bird.id});
  }

}
