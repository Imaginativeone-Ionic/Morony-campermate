import { Injectable }   from '@angular/core';
import { Platform }     from 'ionic-angular';
import { Connectivity } from './connectivity';
import { Geolocation }  from 'ionic-native';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoogleMaps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string;

  constructor(public connectivityService: Connectivity, public http: Http) {
    console.log('Hello GoogleMaps Provider');
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;

    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google maps JavaScript needs to be loaded.");

        this.disableMap();

        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then( () => {

              resolve(true);

            });

            this.enableMap();

          }

          let script = document.createElement("script");
              script.id = "googleMaps";

          if (this.apiKey) {

            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';

          } else {

            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';

          }

          document.body.appendChild(script);

        }

      }

      else {

        if (this.connectivityService.isOnline()) {

          this.initMap();
          this.enableMap();

        } else {

          this.disableMap();

        }

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    return; // this needs to be updated

  }

  disableMap(): void {}

  enableMap(): void {}

  addConnectivityListeners(): void {}

  changeMarker(lat: number, lng: number): void {}

}
