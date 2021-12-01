import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'Dc Comics',
      desc: 'Dc-Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img:''
  }

  constructor(private heroeService: HeroesService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroeService.getHeroeporId(id))
    )
    .subscribe(heroe => this.heroe = heroe);

  }

  guardar(){
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if(this.heroe.id){
      //actualizar
      this.heroeService.actualizarHeroe(this.heroe).subscribe(heroe => console.log('Actualizando',heroe))
    } else {
      //crear
      this.heroeService.agregarHeroe(this.heroe).subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id])
      })
      
    }
    
  }

  borrar(){
    this.heroeService.borrarHeroe(this.heroe.id!)
    .subscribe( resp => {
      this.router.navigate(['/heroes'])
    })
  }
  

}
