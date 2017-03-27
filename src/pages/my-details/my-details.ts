import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../../providers/data';

/*
  Generated class for the MyDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-details',
  templateUrl: 'my-details.html'
})
export class MyDetailsPage {
  
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
    public dataService: Data, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDetailsPage');
  }

}
