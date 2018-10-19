import { Component, OnInit } from '@angular/core';
// this is to import the class Hero
import { Hero } from '../hero';
// this is to import the constant HEROES
// import { HEROES } from '../mock-heroes';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
// this is a class declaration
export class HeroesComponent implements OnInit {
  // hero = 'Windstorm';

  /*
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  */

  // we declare selectedHero property (instance field in Java terminology)
  // which is an object of the Hero class, but we do not assign any value to it
  selectedHero: Hero;
  // I guess this would have been the same:
  // selectedHero: Hero = null;

  // The type of heroes instance field is Hero[] (an array of Hero objects)
  // heroes: Hero[] = HEROES;
  // I could have used just:
  // heroes = HEROES;

  heroes: Hero[];

  // this is a click event handler method
  // it returns nothing
  onSelect(hero: Hero): void {
      this.selectedHero = hero;
  }

  // constructor() { }

  constructor(private heroService: HeroService) { }
  /*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
  */

  getHeroes(): void {
    // we are saying that when the heroService.getHeroes() asynchronous method
    // completes, then the value returned (and array of Hero objects)
    // will be assigned to the heroes property
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

    ngOnInit(): void {
        this.getHeroes();
    }
}

