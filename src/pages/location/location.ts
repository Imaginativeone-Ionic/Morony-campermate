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
  }

  setLocation(): void {

    alert("Set Location");

  }

  takeMeHome(): void {

    alert("Take Me Home");

  }

}
