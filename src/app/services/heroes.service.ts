import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-a7317.firebaseio.com';
  constructor( private http:HttpClient) { }

  crearHeroe( heroe:HeroeModel ){
    return this.http.post(`${ this.url }/heroes.json`, heroe)
    .pipe(
      map( (resp:any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel){
    const heroeTemp = {
      ...heroe    //crea todas las propiedades de hereo
    }
    delete heroeTemp.id; //para no tener la propiedad id pq es la misma
    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp ); // .sjon para firebase
  }

  borrarHeroe( id ){
    return this.http.delete( `${ this.url}/heroes/${id}.json`);
  }

  getHeroe( id:string){
    return this.http.get( `${ this.url}/heroes/${id}.json` );
  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map( this.crearArreglo) //igual que  map(resp => this.crearArreglo(resp))
    );
  }

  private crearArreglo( heroesObj: object ){

    const heroes: HeroeModel[] = [];
    //console.log(heroesObj);

    if( heroesObj === null) { return []; } //valida si esta la bd vacia

    Object.keys( heroesObj ).forEach( key =>{
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });

    return heroes;
  }

}
