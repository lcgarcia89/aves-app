import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { BirdsServiceProvider } from '../../providers/birds-service/birds-service';
import { Bird } from '../../model/bird';
import { Avistamiento } from "../añadir-avistamiento/avistamiento-form";



@Component({
  selector: 'page-detalle-ave',
  templateUrl: 'detalle-ave.html'
})
export class DetalleAve implements OnInit{

  bird_id: string;

  bird: Bird;

  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, public navParams: NavParams, public birdsService: BirdsServiceProvider) {

  }

  // form initialised
  ngOnInit() {
    this.bird_id = this.navParams.get('bird_id');
  }


  addSighting(event, id) {
    this.navCtrl.push(Avistamiento, {bird_id: id});

  }

  ionViewWillEnter(){
    this.birdsService.getBirdDetail(this.bird_id).subscribe(
      (data) => {
        this.bird = new Bird(data[0]['id'], data[0]['idUser'], data[0]['bird_image'], data[0]['bird_name'], data[0]['bird_description'], data[0]['bird_sightings']
          , data[0]['sightings_list']);
      },
      error => {
        console.log(error);
      }
    )

  }

}
