import {Injectable} from '@angular/core';

// Hero is a class
import { Hero } from './hero';
// HEROES is a constant, it is also an array of 10
// Hero objects
import { HEROES } from './mock-heroes';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

// Injectable is a decorator, which is similar to an annotation but not the same thing
// this registers this service with the root injector
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // constructor() { }

  constructor(private messageService: MessageService) {}

  // getHeroes is a synchronous method which returns an array of Hero objects
  /*
  getHeroes(): Hero[] {
    return HEROES;
  }
  */

  // this is an asynchronous method
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
