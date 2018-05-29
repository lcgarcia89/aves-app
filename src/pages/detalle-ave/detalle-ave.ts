import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';
import { Bird } from '../../model/bird';


@Component({
  selector: 'page-detalle-ave',
  templateUrl: 'detalle-ave.html'
})
export class DetalleAve implements OnInit{

  bird_id: string;

  bird: Bird;

  constructor(public navCtrl: NavController, public navParams: NavParams, public birdsService: BirdsServiceProvider) {

  }

  // form initialised
  ngOnInit() {
    this.bird_id = this.navParams.get('bird_id');
    console.log('navParams: ' + this.navParams);

    console.log('navParams: ' + this.bird_id);

    this.birdsService.getBirdDetail(this.bird_id).subscribe(
      (data) => {
        console.log(data[0]);
        this.bird = new Bird(data[0]['id'], data[0]['idUser'], data[0]['bird_image'], data[0]['bird_name'], data[0]['bird_description'], data[0]['bird_sightings']);
        console.log('Bird ---> ' +  this.bird.sightings);
        // data.forEach( bird => {
        //   this.birds.push({id: bird.id, name: bird.bird_name, image: bird.bird_image, sightings: bird.bird_sightings, mine: bird.mine});
        // });
      },
      error => {
        console.log(error);
      }
    )
  }

}
