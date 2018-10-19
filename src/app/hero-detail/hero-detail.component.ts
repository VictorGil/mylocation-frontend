import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // The value of this instance field is injected by the heroes component
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
