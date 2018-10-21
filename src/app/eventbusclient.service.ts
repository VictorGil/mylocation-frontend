import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import { Observable, Observer } from 'rxjs';
import { LocationData } from './locationdata';
import { LocationDataJson } from './locationdatajson';

@Injectable({
    providedIn: 'root'
})

export class EventbusclientService {
    private readonly eventBus: EventBus;
    private readonly url: string;
    public readonly observableMessage: Observable<LocationData>;
    private messageObserver: Observer<LocationData>;

    constructor() {
        console.log('Starting EventbusclientService constructor method');

        // this.url = 'http://192.168.0.101:8093/eventbusbridge';
        this.url = 'http://localhost:8093/eventbusbridge';

        const options = {
            vertxbus_reconnect_attempts_max: Infinity, // Max reconnect attempts
            vertxbus_reconnect_delay_min: 10000, // Initial delay (in ms) before first reconnect attempt
            vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
            vertxbus_reconnect_exponent: 2, // Exponential backoff factor
            vertxbus_randomization_factor: 0.5 // Randomization factor between 0 and 1
        };
        this.eventBus = new EventBus(this.url, options);

        // we need the "self" constant because we cannot use "this" inside the function below
        const self = this;
        this.observableMessage = Observable.create(function(observer: Observer<LocationData>) {
                self.messageObserver = observer;
                });
    }

    public setUpEventBusClient(): void {
        console.log('Starting ngOnInit method');

        // we need the "self" constant because we cannot use "this" inside the function below
        const self = this;
        this.eventBus.onopen = function() {
                console.log('onopen function started');
                self.eventBus.registerHandler('multicast', function(error, message) {
                        console.log('Received a message: ' + message);
                        console.log('Type of "error" variable: ' + typeof(error)); // object
                        console.log('Type of "message" variable: ' + typeof(message)); // object
                        console.log('Type of "message.body" variable: ' + typeof(message.body)); // string

                        const messageBody: string = message.body as string;
                        const locationDataJson: LocationDataJson = JSON.parse(messageBody) as LocationDataJson;
                        const locationData: LocationData = new LocationData(locationDataJson);

                        self.messageObserver.next(locationData);
                });
         };

        this.eventBus.enableReconnect(true);
    }

    public closeEventBusClient(): void {
        this.eventBus.close();
        console.log('Connection to the Vert.x event bus has been closed');
    }

    // this method is just for testing
    public sendMessage() {
        this.eventBus.publish('multicast', {fruit: 'grape', color: 'yellow'});
    }
}

