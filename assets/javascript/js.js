// Initialize Firebase
var config = {
    apiKey: "AIzaSyCw1iDS84Bz7Wk5ifElmdhN1fyQ4LsRALY",
    authDomain: "pokerdata-23592.firebaseapp.com",
    databaseURL: "https://pokerdata-23592.firebaseio.com",
    projectId: "pokerdata-23592",
    storageBucket: "pokerdata-23592.appspot.com",
    messagingSenderId: "144592076912"
};
firebase.initializeApp(config);
const DB = firebase.database();
const connectionRef = DB.ref("/players")
const connectedRef = DB.ref(".info/connected")
const gameState = DB.ref("gameState");

connectedRef.on("value", snapshot => { //assign user IDs
    if (snapshot.val()) {
        const connection = connectionRef.push(true);
        game.localID = connection.key;
        connection.onDisconnect().remove(() => {
            gameState.remove();
        });
    }
});

