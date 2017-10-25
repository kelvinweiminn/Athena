var functions = require('firebase-functions');
var admin = require('firebase-admin');
 
admin.initializeApp(functions.config().firebase);
var wrotedata;

function processtokens(rawtokens) {
    var promise = new Promise((resolve, reject) => {
        var processedtokens = [];
        for (var token in rawtokens) {
            processedtokens.push(rawtokens[token]);
        }
        resolve(processedtokens);
    })
    return promise;    
}

function processrecords(rawrecords) {
    var promise = new Promise((resolve, reject) => {
        var processedrecords = [];
        for (var record in rawrecords) {
            processedrecords.push(rawrecords[record]);
        }
        resolve(processedrecords);
    })
    return promise;    
}

exports.HelmetTrigger = functions.database.ref('/employee/kelvin/status').onUpdate(event => {
    wrotedata = event.data.val();
    console.log("Something on: " + wrotedata);
     
    var tokens = [];

    if(wrotedata == "0"){

        admin.database().ref('/pushtokens').once('value').then((alltokens) => {
        
            var rawtokens = alltokens.val();
            console.log("Retrieved tokens: " + JSON.stringify(rawtokens));

            processtokens(rawtokens).then((processedtokens) => {

                for (var token of processedtokens) {
                    console.log("Processing token...");
                    tokens.push(token.devtoken);
                    console.log("Token pushed: " + token.devtoken);
                }

                var payload = {
                    "notification":{
                        "title":"Alert!",
                        "body":"Someone's not wearing the helmet!",
                        "sound":"default",
                        },
                    "data":{
                        "sendername":"Alert!",
                        "message":"Someone's not wearing helmet!"
                    }
                }

                return admin.messaging().sendToDevice(tokens, payload).then((response) => {
                    console.log('Pushed notifications');
                }).catch((err) => {
                    console.log(err);
                })

            })    
        })


    }


})

