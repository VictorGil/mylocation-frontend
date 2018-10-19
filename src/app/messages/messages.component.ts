import { Component, OnInit, OnDestroy } from '@angular/core';
import {MessageService} from '../message.service';
import {EventbusclientService} from '../eventbusclient.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit, OnDestroy {
    eventbusMessageReceived: String = 'no message yet';

    // it needs to be public because Angular only binds to public component properties.
    constructor(public messageService: MessageService,
            public eventbusclientService: EventbusclientService) {
        console.log('Constructor method of the MessagesComponent');
    }

    ngOnInit(): void {
        this.eventbusclientService.setUpEventBusClient();
        this.eventbusclientService.observableMessage.subscribe(message => this.eventbusMessageReceived = message);
    }

    ngOnDestroy(): void {
        this.eventbusclientService.closeEventBusClient();
    }
}

