import { Component, OnInit, OnDestroy } from '@angular/core';
import {EventBusClientService} from '../eventBusClient.service';
import { LocationData } from '../locationData';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
    readonly eventBusClientService: EventBusClientService;
    eventBusMessageReceived: String = 'no message yet';

    // it needs to be public because Angular only binds to public component properties.
    constructor(eventBusClientService: EventBusClientService) {
        this.eventBusClientService = eventBusClientService;
    }

    ngOnInit(): void {
        this.eventBusClientService.setUpEventBusClient();
        this.eventBusClientService.observableLocationData.subscribe(locationData => this.eventBusMessageReceived =
                locationData.timeMesasuredString);
    }

    ngOnDestroy(): void {
        this.eventBusClientService.closeEventBusClient();
    }
}

