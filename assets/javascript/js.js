console.log('helo');
const player1;
const player2;
const player3;
const player4;
const player5;
const player6;
const player7;
const player8;
const player1Hand = [];
const player2Hand = [];
const player3Hand = [];
const player4Hand = [];
const player5Hand = [];
const player6Hand = [];
const player7Hand = [];
const player8Hand = [];
let dealCount = 0;
const smallBlind = 2;
const bigBlind = 4;
let potTotal = 0;
const playerCardCount = 0;
const playerPot = 0;
const raiseValue = 0;
const onePair = 1;
const twoPair = 2;
const threeofKind = 3;
const straight = 4;
const flush = 5
const fullHouse = 6
const straightFlush = 7
const royalFlush = 8
const cardDeck = ['2h', '2s', '2d', '2c', '3h', '3s', '3d', '3c', '4h', '4s', '4d', '4c', '5h', '5s', '5d', '5c',
    '6h', '6s', '6d', '6c', '7h', '7s', '7d', '7c', '8h', '8s', '8d', '8c', '9h', '9s', '9d', '9c', '10h', '10s', '10d', '10c', 'jh',
    'js', 'jd', 'jc', 'qh', 'qs', 'qd', 'qc', 'kh', 'ks', 'kd', 'kc', 'ah', 'as', 'ad', 'ac',]
let shuffledDeck = [];
let tableCards = [];
let player1ChosenCards = [''];
let player2ChosenCards = [''];
let player3ChosenCards = [''];
let player4ChosenCards = [''];
let player5ChosenCards = [''];
let player6ChosenCards = [''];
let player7ChosenCards = [''];
let player8ChosenCards = [''];
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
// const numberofPlayers = DB.ref("/players") maybe this instead of incrementing it on every player add function?
const connectedRef = DB.ref(".info/connected")
const gameState = DB.ref("gameState");
var errorCode;
var errorMessage;
var email;
var credential;
var user;
var callBack;
var displayName;
var emailVerified;
var photoURL;
var isAnonymous;
var uid;
var providerData;
var password;
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
    callBack = response.data;
    console.log(response);
});
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithRedirect(provider);
        // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('quickstart-sign-in').disabled = true;
    // [END_EXCLUDE]
}


function initApp() {
    // Result from Redirect auth flow.
    // [START getidptoken]
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // [START_EXCLUDE]
            document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        }
        // The signed-in user info.
        user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        errorCode = error.code;
        errorMessage = error.message;
        // The email of the user's account used.
        email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        } else {
            console.error(error);
        }
        // [END_EXCLUDE]
    });
    // [END getidptoken]
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            displayName = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            isAnonymous = user.isAnonymous;
            uid = user.uid;
            providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            document.getElementById('quickstart-account-details').textContent = 'null';
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function () {
    initApp();
};
function toggleSignIn() {    //Email/password sign in from Firebase doc
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        email = document.getElementById('email').value;
        password = document.getElementById('password').value;
        if (email.length < 4 & email.includes('@') === false) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            errorCode = error.code;
            errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}
/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    if (email.length < 4 & email.includes('@') === false) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END createwithemail]
}
/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function () {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}
function sendPasswordReset() {
    email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        errorCode = error.code;
        errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}
function initApp2() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
            // User is signed in.
            displayName = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            isAnonymous = user.isAnonymous;
            uid = user.uid;
            providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
                document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}
window.onload = function () {
    initApp2();
};
function checkLoginState(event) {
    if (event.authResponse) {
        // User is signed-in Facebook.
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(event.authResponse, firebaseUser)) {
                // Build Firebase credential with the Facebook auth token.
                // [START facebookcredential]
                credential = firebase.auth.FacebookAuthProvider.credential(
                    event.authResponse.accessToken);
                // [END facebookcredential]
                // Sign in with the credential from the Facebook user.
                // [START authwithcred]
                firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function (error) {
                    // Handle Errors here.
                    errorCode = error.code;
                    errorMessage = error.message;
                    // The email of the user's account used.
                    email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    credential = error.credential;
                    // [START_EXCLUDE]
                    if (errorCode === 'auth/account-exists-with-different-credential') {
                        alert('You have already signed up with a different auth provider for that email.');
                        // If you are using multiple auth providers on your app you should handle linking
                        // the user's accounts here.
                    } else {
                        console.error(error);
                    }
                    // [END_EXCLUDE]
                });
                // [END authwithcred]
            } else {
                // User is already signed-in Firebase with the correct user.
            }
        });
    } else {
        // User is signed-out of Facebook.
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
}
// [END facebookcallback]
/**
 * Check that the given Facebook user is equals to the  given Firebase user
 */
// [START checksameuser]
function isUserEqual(facebookAuthResponse, firebaseUser) {
    if (firebaseUser) {
        providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
                providerData[i].uid === facebookAuthResponse.userID) {
                // We don't need to re-auth the Firebase connection.
                return true;
            }
        }
    }
    return false;
}
// [END checksameuser]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp3() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            displayName = user.displayName;
            email = user.email;
            emailVerified = user.emailVerified;
            photoURL = user.photoURL;
            isAnonymous = user.isAnonymous;
            uid = user.uid;
            providerData = user.providerData;
            // [START_EXCLUDE]
            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');  UNCOMMENT
            // [END_EXCLUDE]
        } else {

            // document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            //document.getElementById('quickstart-account-details').textContent = 'null';

        }
    });
    // [END authstatelistener]
}
window.onload = function () {
    initApp3();
}
// FB.init({
//     appId: 2642487855777641,
//     status: true,
//     xfbml: true,
//     version: 'v2.6'
// });
// [START_EXCLUDE silent]
// Observe the change in Facebook login status
// [START facebookauthlistener]
//FB.Event.subscribe('auth.authResponseChange', checkLoginState);
// [END facebookauthlistener]
// [END_EXCLUDE]
function deckAssign() {
    //this will be the for loop that assigns classes and values to the main deck
}
function game() {            //the whole game box, functions first then all the logic yeah?   
    //function playerJoin(){
    let playerID = `#player${playerNumber}`;
}

function assignPlayerOne() {            //for the player join buttons, attatches the connection to the playerNumbers
    playerNumber++                      //sets player one to currentPlayer and Dealer, player Two to big blind and 3 to small blind
    player1.addClass('currentPlayer', 'dealer', 'playerOne');


}
function assignPlayerTwo() {
    player2.addClass('nextPlayer', 'bigBlind', 'playerTwo');
    playerNumber++
}
function assignPlayerThree() {
    player3.addClass('smallBlind', 'playerThree')
    playerNumber++
}
function assignPlayerFour() {
    player4.addClass('playerFour')
    playerNumber++
}
function assignPlayerFive() {
    player5.addClass('playerFive')
    playerNumber++
}
function assignPlayerSix() {
    player6.addClass('playerSix')
    playerNumber++
}
function assignPlayerSeven() {
    player7.addClass('playerSeven')
    playerNumber++
}
function assignPlayerEight() {
    player8.addClass('playerFive')
    playerNumber++
}

//function to deal the cards, on deal will split a card out of the array by random number index, and push it to
function handDeal() {    //the array for playerHand. >>How will it know which player hand to sort too? possible to make a variable with like an [i] item so it can sort through?
    //or a function to create player hand arrays based on log in connections, through a loop probably, and then a loop to deal the cards as well?
    activePlayers = [player1, player2, player3, player4, player5, player6, player7, player8];
    const newDeck = [...cardDeck];  //uses the card deck, but in a way where we can mess with it 
    let cardSelector = (Math.floor(0 - newDeck.length) + 1); //picks a random card out of the deck
    shuffledDeck.push(newDeck.splice(cardSelector, 1)); //pushes it to shuffledDeck
    if (!(connectionsRef * 2) === playercardNumbers) { //if there are not  two cards dealt for every player
        for (i = 0; i <= (playerNumber * 2); i++) // a loop to run for every player x2
            shuffledDeck.push(newDeck.splice(cardSelector, 1));
        playerhand[i].push(newDeck.splice(cardSelector, 1));   //how to loop through players??

    }
    blindSwitch();
    // $('#smallBlind').remove 2 from playerTotal
}
function turnDeal() { //the new deal for the hand
    dealCount++
    if (dealCount === 1) {
        tableCards.push(shuffledDeck(0, 1, 2));
        shuffledDeck.splice(0, 1, 2);           //check splice syntax, should remove cards from deck and put on table
    }
    else {
        tableCards.push(shuffledDeck(0));
        shuffledDeck.splice(0);
    }

    drawFunctionCount++

}
function nextTurn() {
    // a for each function? for each connected player 
    //for playerNumber =>
    $('#currentPlayer').removeClass;
    $('nextPlayer').addClass('currentPlayer');
    $('nextPlayer').removeClass('nextPlayer');
    $('nextPlayer+1').addClass('nextPlayer');
    if (callCount === playerNumber) {
        turnDeal();
    }

}
function bet() { //fixed in 4s   
    if (this.currentPlayer === you) {               //Available move functions
        if (!playerhand === ['']) { //if playerfromfirebase = your player           //gamestate on value change for whos turn it is that gets updated for current turn = firebase info could also move down array
            if (currentBet === 0) {   //if the current bet is 0 (no one has bet yet)
                currentBet === 4        //set the current bet to 4 
            }
            potTotal = potTotal + currentBet;           //then add it to the pot
            playerTotal = playerTotal - currentBet;   //take it out of the player total
            raiseValue = raiseValue + 4;//increment the raise value (for instance would set from 4 to 8 8 to 12)
            callValue + 4    //increments the call value
            nextTurn(); //switch player turns
        }
    }
};
function raise() {
    if (this.currentPlayer === you) {
        if (!playerhand === ['']) { //if ya got cards
            potTotal = potTotal + raiseValue; //add the raised value to the pot
            playerTotal = playerTotal - raiseValue; //grab it out the player val
            currentBet + 4; //add the raise to the call value
            nextTurn(); //switch player turns
        }
    }
}
function call() {
    if (this.currentPlayer === you) {
        if (!playerhand === [''] & (!ccurrentBet === 0)) { //if ya got cards, someone bet -
            potTotal = currentBet + potTotal; //add the current bet to pot
            playerTotal = playerTotal - currentBet; //grab it out the hand
            callCount++ //this variable is used to determine when the next draw function should occur, when callCount === playerNumber
            nextTurn(); //nex tturn
        };
    };
};
function check() {
    if (this.currentPlayer === you) {
        if (currentBet === 0) { //if no one has bet
            nextTurn(); //trade turns
        }
    }
};
function fold() {
    if (this.currentPlayer === you) {
        if (!playerhand === ['']) { //if ya got cards
            playerhand = ['']; //now ya don't
            nextTurn(); //next turn
            activePlayer.split(this.localPlayerNumber); //splits player out of active array
        };
    }
}
function handSelect() {
    if ((callCount === numberOfPlayers) & drawFunctionCount === 3) { //on final bet ((if betCou callCountTotal=MaxPlayers and drawFunctionCount === 3 )
        $('.card').on('click', function (event) {
            // player[i]ChosenHand.push(this)    //on click of card class, push to chosenHand array
        })

    }

    //on click of card class, push to chosenHand array
    //run hand compare function on chosenHand arrays (a forloop to create a new chosenhand[i] for each player in the hand
}
//function to compare hands and select victor
function handCompare() {  //maybe a for loop to sort thru the 7 cards available and by criteria can push them to seperate arrays and based on array with highest value orrr??
    //some like if ((value (i) === value other thing for two pair, handValuePlayerNumber=1

    //need oike a for loloop to sort thru the deck and assign a value to everything based on numeric value anda class based on suit to be used by the function that calculates the winning hand))
}   //could do something like for cardDeck[i], somehow m[ix4 xponentially (Every 4th iteration in the array).addClass SuitHearts suitDiamonds ect.
//do the same thing but [i] [i+12] assign value 2, 3, 4 eect ]
function blindSwitch() {    //this will just end up as an infinite loop of moving 
    $('#currentSmallBlind').removeClass('smallBlind');
    $('#currentBigBlind').removeClass('bigBlind');
    $('#currentDealer').removeClass('dealer');
    for (i = currentPlayerPosition; i < 3; i++) {
        (currentPlayerPosition + 1).addClass('currentSmallBlind');
        (currentPlayerPosition + 2).addClass('currentBigBlind');
        (currentPlayerPosition + 3).addClass('currentDealer');
    }
}
function newHand() { //a function to set the used deck back to full array and begin the deal function
    blindSwitch(); //rotates the blinds and dealer down one
    handDeal(); //uses new deck, deals hands to all connected players
    potTotal = 2; //a new pot
    newDeck = [''];
}
newHand();
}
deckAssign();
game();
//chat function
//assume $('#textInput')
$('submitButton').on('click', function (event) {  //on click of chat submit
    event.preventDevault(); //dont refresh pls
    textInput = $('#textInput').val().trim(); //take the value from the chat input
    database.ref('/chat').push({
        newTextMessage: textInput,  //push to the newTextMessage var in chat branch
    },
        function (errorObject) {  //handle errors
            console.log(errorObject);
        })


})
database.ref('/chat').on('child_added', function (childSnap) { //when message sent to firebase
    $('#chatDiv').append('<p>' + currentPlayer + 'says: ' + childSnap.val().newTextMessage + '</p>') //apend chat to box
})
$('clearButton').on('click', function (event) {
    database.ref('/chat').clear();
})

//array of active players that contains everyone on first hand
next turn function , moves down the array