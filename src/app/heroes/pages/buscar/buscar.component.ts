import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';

  heroes: Heroe[] = [];

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroeService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroeService.getSugerencias(this.termino.trim()).subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent ){

    if(!event.option.value){
      // console.log('no hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroeService.getHeroeporId(heroe.id!).subscribe(heroe => this.heroeSeleccionado = heroe);
  }

}
