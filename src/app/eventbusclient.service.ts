import {Injectable} from '@angular/core';
import * as EventBus from 'vertx3-eventbus-client';
import {eventBusMessageHandler} from './messages/messages.component';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class EventbusclientService {
  public eventBus: EventBus;
  public readonly url: String;

  constructor() {
      console.log('Starting EventbusclientService constructor method');

      // this.url = 'http://192.168.0.101:8093/eventbusbridge';
      // /*
      this.url = 'http://localhost:8093/eventbusbridge';
      const options = {
        vertxbus_reconnect_attempts_max: Infinity, // Max reconnect attempts
        vertxbus_reconnect_delay_min: 10000, // Initial delay (in ms) before first reconnect attempt
        vertxbus_reconnect_delay_max: 5000, // Max delay (in ms) between reconnect attempts
        vertxbus_reconnect_exponent: 2, // Exponential backoff factor
        vertxbus_randomization_factor: 0.5 // Randomization factor between 0 and 1
      };
      this.eventBus = new EventBus(this.url, options);
      // */
  }

  public setUpEventBusClient(): void {
      // we need this because we cannot use "this" inside the function below
      const self = this;
      console.log('Starting ngOnInit method');

      self.eventBus.onopen = function() {
          console.log('onopen function started');
          self.eventBus.registerHandler('multicast', function(error, message) {
              console.log('received a message: ' + JSON.stringify(message));
          });
          // this.eventBus.registerHandler('multicast', eventBusMessageHandler);
      };
      this.eventBus.enableReconnect(true);
  }

  public closeEventBusClient(): void {
      this.eventBus.close();
  }

  public sendMessage() {
    this.eventBus.publish('multicast', {fruit: 'grape', color: 'yellow'});
  }
}

