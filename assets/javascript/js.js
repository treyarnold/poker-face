// Initialize Firebase
const cardDeck = ['2h', '2s', '2d', '2c', '3h', '3s', '3d', '3c', '4h', '4s', '4d', '4c', '5h', '5s', '5d', '5c', '6h', '6s', '6d', '6c', '7h', '7s', '7d', '7c', '8h', '8s', '8d', '8c', '9h', '9s', '9d', '9c', '10h', '10s', '10d', '10c', 'jh', 'js', 'jd', 'jc', 'qh', 'qs', 'qd', 'qc', 'kh', 'ks', 'kd', 'kc', 'ah', 'as', 'ad', 'ac',]
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
const pagereturn = 1 //ajax unsplash query for card backings
let query = 'dogs'
const QueryUrl = `https://api.unsplash.com/search/photos?page=${pagereturn}&query=${query}&client_id=1a8efd59c4b5cb5e177aea595dc217c32b578bb3d681940bb9c01a4bf5cc0919`;
$.ajax({
    url: QueryUrl,
    methodf: "GET"
}).then(function (response) {
    var callBack = response.data;
    console.log(response);
});

//deal card function
playerHand = []

//bet/check function to run as long as cardsbeingDealt === true + 1?

//function to compare hands and select victor


