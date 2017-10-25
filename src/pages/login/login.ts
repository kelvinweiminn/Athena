import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from 'angularfire2/database';

import { HomePage } from '../home/home';

import firebase from 'firebase';
declare var FCMPlugin;
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {};
  constructor(private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private afd: AngularFireDatabase) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
 
  async login(user){
    var devToken;
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if (result){
        this.navCtrl.setRoot(HomePage);
        
        this.tokensetup().then((token)=>{
          devToken = token;
          console.log("Token generated: " + devToken);
          this.afd.object("/pushtokens/"+devToken).set({
            uid: firebase.auth().currentUser.uid,
            devtoken: token,
            inuse: "yes"
          });
        })        
        
      }
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

}
