import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

declare var FCMPlugin;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  employee;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {
    this.afd.list('/employee').valueChanges().subscribe((res) => {
      this.employee = res[0];
      console.log(this.employee);
    });
  }
 
  ionViewDidLoad() {
    FCMPlugin.onNotification(function(data){
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert(data.message);
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        alert(data.message);
      }
    });
 
    FCMPlugin.onTokenRefresh(function(token){
        alert( token );
    });    
  }
}
