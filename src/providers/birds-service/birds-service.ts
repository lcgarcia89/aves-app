import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BirdsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('BirdsServiceProvider Provider started');
  }

  getBirds(id: string) {
    return this.http.get<any[]>('http://dev.contanimacion.com/birds/public/getBirds/' + id);
  }

  getBirdDetail(id: string){
    return this.http.get('http://dev.contanimacion.com/birds/public/getBirdDetails/' + id);
  }

  postSighting(id: string, place: string, latitude: number, longitude: number) {
    return this.http.post('http://dev.contanimacion.com/birds/public/addSighting/', {idAve: id, place: place, long: longitude, lat: latitude});
  }

  postAddBird(id: string, bird_name: string, bird_description: string) {
    return this.http.post('http://dev.contanimacion.com/birds/public/addBird/', {idUser: id, bird_name: bird_name, bird_description: bird_description});
  }

  postAddBirdWithSighting(id: string, bird_name: string, bird_description: string, place: string, latitude: number, longitude: number) {
    return this.http.post('http://dev.contanimacion.com/birds/public/addBird/',
      {idUser: id, bird_name: bird_name, bird_description: bird_description, place: place, long: longitude, lat: latitude});
  }

}
