/// <reference types="pusher-js" />

import { Observable } from 'rxjs';
import * as Pusher from 'pusher-js';

export class PusherService {
  private instance: Pusher.Pusher;

  constructor(private key: string, private config: Pusher.Config) {}

  listenForNotifications(email: string): Observable<string> {
    // create a new observable and have the receiving party handle subscribe and use logic and then unsubscribe
    return new Observable(s => {
      let userChannel: Pusher.Channel;

      this.getPusherInstance().then(i => {
        userChannel = i.subscribe(email);
        userChannel.bind('notify', function(data) {
          s.next(JSON.stringify(data));
        });
      });

      // clean up the binding
      return () => {
        userChannel.unbind('notify');
      };
    });
  }

  private getPusherInstance() {
    if (this.instance == null) {
      this.instance = new Pusher(this.key, this.config);
    }
    return Promise.resolve(this.instance);
  }

  // private getPusherInstance() {
  //   return import('pusher-js').then((p: any) => {
  //     if (this.instance == null) {
  //       // we know this is imported as { default: PusherStatic } contrary to what our import types this as
  //       const Pusher: Pusher.PusherStatic = p.default;
  //       this.instance = new Pusher(this.key, this.config);
  //     }
  //     return this.instance;
  //   });
  // }
}
