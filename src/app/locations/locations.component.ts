import { Component, OnInit, OnDestroy } from '@angular/core';
import {EventBusClientService} from '../eventBusClient.service';
import { LocationData } from '../locationData';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnDestroy {
    readonly eventBusClientService: EventBusClientService;
    locations: LocationData[] = new Array<LocationData>();
    selectedLocation: LocationData;

    constructor(eventBusClientService: EventBusClientService) {
        this.eventBusClientService = eventBusClientService;
    }

    onSelect(selectedLocation: LocationData): void {
        this.selectedLocation = selectedLocation;
    }

    ngOnInit(): void {
        this.eventBusClientService.setUpEventBusClient();
        this.eventBusClientService.observableLocationData.subscribe(
            locationData => this.locations.push(locationData));
        this.forceLocationsRefresh();
    }

    forceLocationsRefresh(): void {
        const auxiliar: LocationData[] = Object.assign([], this.locations);
        this.locations = auxiliar;
    }

    ngOnDestroy(): void {
        this.eventBusClientService.closeEventBusClient();
    }
}

