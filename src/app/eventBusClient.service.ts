import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import { Observable, Observer } from 'rxjs';
import { LocationData } from './locationData';
import { LocationDataJson } from './locationDataJson';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class EventBusClientService {
    private readonly eventBus: EventBus;
    private readonly url: string;

    public readonly locationDataObservable: Observable<LocationData>;
    private locationDataObserver: Observer<LocationData>;

    public readonly lastKnownLocationDataObservable: Observable<LocationData>;
    private lastKnownLocationDataObserver: Observer<LocationData>;

    constructor() {
        console.log('Starting EventbusclientService constructor method');

        this.url = environment.eventBusClientServiceUrl;

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

        this.locationDataObservable = Observable.create(function(observer: Observer<LocationData>) {
                self.locationDataObserver = observer;
                });

        this.lastKnownLocationDataObservable = Observable.create(function(observer: Observer<LocationData>) {
                self.lastKnownLocationDataObserver = observer;
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
                        if (error == null) {
                            console.log('"error" variable is null');
                        } else {
                            for (const property of Object.keys(error)) {
                                console.log('The "' + property + '" property value of "error" object is: ' + error[property]);
                            }
                        }

                        console.log('Type of "message" variable: ' + typeof(message)); // object
                        if (message == null) {
                            console.log('The "message" variable is null');
                        } else {
                            for (const property of Object.keys(message)) {
                                console.log('The "' + property + '" property value of "message" object is: ' + message[property]);
                            }
                        }
                        console.log('Type of "message.body" variable: ' + typeof(message.body)); // object
                        console.log('Received message: ' + JSON.stringify(message.body));

                        const locationDataJson: LocationDataJson = message.body as LocationDataJson;
                        const locationData: LocationData = new LocationData(locationDataJson);

                        self.locationDataObserver.next(locationData);
                });

                self.requestLatestKnownLocation();
        };

        this.eventBus.enableReconnect(true);
    }

    public closeEventBusClient(): void {
        this.eventBus.close();
        console.log('Connection to the Vert.x event bus has been closed');
    }

    private requestLatestKnownLocation() {
        console.log('Going to request the latest saved location to the server.');
        // we need the "self" constant because we cannot use "this" inside the function below
        const self = this;

        const currentUnixTime = Date.now() / 1000;
        this.eventBus.send('last_known_location_request_frontend', {timestamp: currentUnixTime}, function(error, message) {
            if (error == null) {
                console.log('The "error" variable is null');
            } else {
                for (const property of Object.keys(error)) {
                    console.log('The "' + property + '" property value of "error" object is: ' + error[property]);
                }
            }

            if (message == null) {
                console.log('The "message" variable is null');
            } else {
                for (const property of Object.keys(message)) {
                    console.log('The "' + property + '" property value of "message" object is: ' + message[property]);
                }

                console.log('Body of the message: ' + message.body);
                if (message.body == null) {
                    console.log('The "body" of the message is null');
                } else {
                    for (const property of Object.keys(message.body)) {
                        console.log('The "' + property + '" property value of "body" object is: ' + message.body[property]);
                        console.log('Type of "' + property + '" property is: ' + typeof(property));
                    }
                    console.log('The response received from the server:\n' + JSON.stringify(message.body));
                    const lastKnownLocationDataJson: LocationDataJson = message.body as LocationDataJson;
                    const lastKnownLocationData: LocationData = new LocationData(lastKnownLocationDataJson);
                    self.lastKnownLocationDataObserver.next(lastKnownLocationData);
                }
            }
        });
     }
}

