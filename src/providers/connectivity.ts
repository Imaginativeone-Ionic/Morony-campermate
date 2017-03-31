import { Injectable } from '@angular/core';
import { Network } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Connectivity provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

declare var Connection;

@Injectable()

export class Connectivity {

  onDevice: boolean;

  constructor(public platform: Platform, public http: Http) {
    console.log('Hello Connectivity Provider');

    this.onDevice = this.platform.is('cordova');

  }
  
  isOnline(): boolean {
    if (this.onDevice && Network.type) {
      return Network.type != 'none';
    } else {
      return !navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && Network.type) {
      return Network.type == 'none';
    } else {
      return !navigator.onLine;
    }
  }

  watchOnline(): Observable<any> {
    return Network.onConnect();
  }

  watchOnline(): Observable<any> {
    return Network.onDisconnect();
  }
  
}
