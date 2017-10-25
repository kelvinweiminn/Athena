import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

import firebase from 'firebase';

declare var FCMPlugin;

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {};
  postJson = {
    value1: "", 
    value2: "",
    value3: ""
  };

  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');

  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
        this.tokensetup().then((token) => {
          this.storetoken(token);
      });

    this.fdb.database.ref("/employee")
    .child(firebase.auth().currentUser.uid)
    .set({
      uid: firebase.auth().currentUser.uid,
      name: user.name, 
      email: user.email
    });

    }
    catch(e){
      console.log(e);
    }
  }

  tokensetup(){
    var promise = new Promise((resolve,reject) => {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err => {
        reject(err);
      }));
    });
  return promise;
  }

  storetoken(token){
    this.fdb.database.ref("/pushtokens")
    .child(token)
    .set({
      uid: firebase.auth().currentUser.uid,
      devtoken: token,
      inuse: "no"
    }).then(()=>{
      alert('Token stored');
    }).catch(()=>{
      alert('Token not stored');
    });

  }
}
