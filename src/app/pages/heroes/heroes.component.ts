import { Component, OnInit } from '@angular/core';
import { HeroesService } from './../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import { browser } from 'protractor';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;
  constructor( private heroesService:HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
    .subscribe( resp => {
      //console.log(resp);
      this.heroes = resp; 
      this.cargando = false;
    });
        
  }

  borrarHeroe( heroe: HeroeModel, i:number){

    Swal.fire({
      title : '¿Esta seguro?',
      text: `¿Esta seguro que quiere borrar a ${ heroe.nombre } ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp=>{
      if( resp.value){
        this.heroes.splice( i,1 ); //para borrar  de la lista
        this.heroesService.borrarHeroe(heroe.id).subscribe(); 
              //.subscribe para que se dispare
      }
    });
    
  }

}
