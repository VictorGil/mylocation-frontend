import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import { Observable, Observer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EventbusclientService {
    private readonly eventBus: EventBus;
    private readonly url: String;
    public observableMessage: Observable<String>;
    private messageObserver: Observer<String>;

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
        this.observableMessage = Observable.create(function(observer: Observer<String>) {
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
                        const messageString: String = JSON.stringify(message);
                        console.log('Received a message: ' + messageString);
                        self.messageObserver.next(messageString);
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

