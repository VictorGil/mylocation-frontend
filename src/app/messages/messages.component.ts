import { Component, OnInit, OnDestroy } from '@angular/core';
import {EventbusclientService} from '../eventbusclient.service';
import { LocationData } from '../locationdata';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, OnDestroy {
    eventbusMessageReceived: String = 'no message yet';

    // it needs to be public because Angular only binds to public component properties.
    constructor(public eventbusclientService: EventbusclientService) {
        console.log('Constructor method of the MessagesComponent');
    }

    ngOnInit(): void {
        this.eventbusclientService.setUpEventBusClient();
        this.eventbusclientService.observableMessage.subscribe(locationData => this.eventbusMessageReceived =
                locationData.timeMesasuredString);
    }

    ngOnDestroy(): void {
        this.eventbusclientService.closeEventBusClient();
    }
}

