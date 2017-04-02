import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class Data {

  constructor(public storage: Storage, public http: Http) {
    console.log('Hello Data Provider');
  }

  setMyDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('mydetails', newData);
  }

  setCampDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('campdetails', newData);
  }

  // Current Development
  setLocation(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('location', newData);

    let savedValue = this.storage.get('location');

    console.log("Data.setLocation(data): ", data);
    console.log("savedValue: ", savedValue);
  }

  getMyDetails(): Promise<any> {
    return this.storage.get('mydetails');
  }

  getCampDetails(): Promise<any> {
    return this.storage.get('campdetails');
  }

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

}
