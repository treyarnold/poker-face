// Initialize Firebase
const cardDeck = ['2h', '2s', '2d', '2c', '3h', '3s', '3d', '3c', '4h', '4s', '4d', '4c', '5h', '5s', '5d', '5c', '6h', '6s', '6d', '6c', '7h', '7s', '7d', '7c', '8h', '8s', '8d', '8c', '9h', '9s', '9d', '9c', '10h', '10s', '10d', '10c', 'jh', 'js', 'jd', 'jc', 'qh', 'qs', 'qd', 'qc', 'kh', 'ks', 'kd', 'kc', 'ah', 'as', 'ad', 'ac',]
let shuffledDeck = [];
const config = {
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
function game() {            //the whole game box, functions first then all the logic yeah?   
    const playerHand = ['']
    const smallBlind = 2;
    const bigBlind = 4;
    const potTotal = 0;
    const playerCardCount = 0;
    const playerPot = 0;
    for (i = 0; i <= connectedRef; i++) //but then these variables will be out of scope to be used by the rest of the game I do be;ieve :l




        //function to deal the cards, on deal will split a card out of the array by random number index, and push it to
        function handDeal() {    //the array for playerHand. >>How will it know which player hand to sort too? possible to make a variable with like an [i] item so it can sort through?
            //or a function to create player hand arrays based on log in connections, through a loop probably, and then a loop to deal the cards as well?



        }

    function bet() { //how will user bet be inputted? should it be fixed or with an input box with parameters? 
        //add bet value to pottotal, subtract from player total 
    };
    function check() {
        //if bet value === 0
        //move to next player
    };
    //bet/check function to run as long as cardsbeingDealt === true + 1?
    function fold() {
        playerhand = [''];
    };

    function call() {
        //add bet value to pot total, subtract from playertotal


    };
    //function to compare hands and select victor
    function handCompare() {  //maybe a for loop to sort thru the 7 cards available and by criteria can push them to seperate arrays and based on array with highest value orrr??
        const onePair = 1;      //like if letter === letter[i] push to possibleHandArray or som
        const twoPair = 2;
        const threeofKind = 3;
        const straight = 4;
        const flush = 5
        const fullHouse = 6
        const straightFlush = 7
        const royalFlush = 8

    }
    function blindSwitch() {

        //something to rotate the blinds and dealer (class? ooooo that sounds, like a player.removeClass(smallBlind) player.addClass(bigBlind) or u no)
    }
    function newHand() { //a function to set the used deck back to full array and begin the deal function


    }
}