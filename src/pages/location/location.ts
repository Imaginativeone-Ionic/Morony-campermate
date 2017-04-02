import { NavController, Platform, AlertController, NavParams } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { GoogleMaps }  from '../../providers/google-maps';
import { Data } from '../../providers/data';

/*
  Generated class for the Location page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})

export class LocationPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  latitude:  number;
  longitude: number;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, 
      public platform: Platform, public dataService: Data, public alertCtrl: AlertController, 
      public navParams: NavParams) {

      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    console.log('@ViewChild has been added');

    this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {

      this.maps.changeMarker(this.latitude, this.longitude);

    });

  }

  setLocation(): void {

    alert("Set Location");

    Geolocation.getCurrentPosition().then((position) => {

      this.latitude  = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude);

      let data = {
        latitude:  this.latitude,
        longitude: this.longitude
      }

      // this.dataService.setLocation(data);

      let alert = this.alertCtrl.create({
        title:    'Location Set!',
        subTitle: 'You can now find your way back to you camp site from ' + 
                  'anywhere by clicking the button in the top right corner.',
        buttons: [{ text: 'Ok'}]
      });

      alert.present();

    });

  }

  takeMeHome(): void {

    alert("Take Me Home");

  }

}
