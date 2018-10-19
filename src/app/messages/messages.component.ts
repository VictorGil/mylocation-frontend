import {Component} from '@angular/core';
import {MessageService} from '../message.service';
import {OnDestroy, OnInit} from '@angular/core';
// import {EventbusclientService} from '../eventbusclient.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent {
    eventbusMessageReceived: String = 'no message yet';

    // it needs to be public because Angular only binds to public component properties.
    constructor(public messageService: MessageService) {
            // public eventbusclientService: EventbusclientService) {
        console.log('constructor method of the MessagesComponent');
    }

}

export function eventBusMessageHandler(error, message): void {
  this.eventbusMessageReceived = JSON.stringify(message);
  console.log('Received a message from the Vert.x event bus: ' + this.eventbusMessageReceived );
}

