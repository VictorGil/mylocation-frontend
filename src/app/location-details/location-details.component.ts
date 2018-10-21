import { Component, Input } from '@angular/core';
import { LocationData } from '../locationData';
@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {

    @Input()
    location: LocationData;
}

