import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

/**
 * Generated class for the TemphumidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-temphumid',
  templateUrl: 'temphumid.html',
})
export class TemphumidPage {

  employee;
  
  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.afd.list('/employee').valueChanges().subscribe((res) => {
      this.employee = res[0];
      console.log(this.employee);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemphumidPage');
  }

}
