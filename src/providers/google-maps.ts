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
  apiKey: string = "AIzaSyC-FlaMjI_bkiKO96mL-Jy3iXyFWrNIZvw";

  constructor(public connectivityService: Connectivity, public http: Http) {
    console.log('constructor: Hello GoogleMaps Provider');
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    console.log("init() function");

    this.mapElement    = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    console.log("loadGoogleMaps() function");

    return new Promise((resolve) => {

      console.log("typeof google: ", typeof google);

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        console.log("Google Maps JavaScript must be loaded.");

        this.disableMap();

        if (this.connectivityService.isOnline()) {

          console.log("Connectivity Service is Online", this.connectivityService);
          console.log("Connectivity Service is Online", this.connectivityService.isOnline());

          window['mapInit'] = () => {

            this.initMap().then(() => {

              resolve(true);

            });

            this.enableMap();

          }

          let script = document.createElement("script");
              script.id = "googleMaps";

          console.log("this.apiKey: ", this.apiKey);

          if (this.apiKey) {

            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';

            console.log("script: ", script);

          } else {

            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';

            console.log("script: ", script);

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

    console.log("initMap() function");

    this.mapInitialised = true;

    return new Promise((resolve) => {

      Geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);

      });

    });

  }

  disableMap(): void {

    console.log("disableMap() function");
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {

    console.log("enableMap() function");
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    console.log("addConnectivityListeners() function");

    this.connectivityService.watchOnline().subscribe(() => {

      console.log("online");

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } 
        
        else {

          if (!this.mapInitialised) {

            this.initMap();

          }

          this.enableMap();

        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      console.log("offline");

      this.disableMap();

    });

  }

  changeMarker(lat: number, lng: number): void {
    
    console.log("changeMarker() function");

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    if (this.currentMarker) { this.currentMarker.setMap(null) }

    this.currentMarker = marker;

  }

}
