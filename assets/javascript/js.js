let dealCount = 0;
const smallBlind = 2;
const bigBlind = 4;
let potTotal = 0;
const playerCardCount = 0;
const playerPot = 200;
const raiseValue = 0;
const onePair = 1;
const twoPair = 2;
const threeofKind = 3;
const straight = 4;
const flush = 5
const fullHouse = 6
const straightFlush = 7
const royalFlush = 8
const cardDeck = ['2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', 'jh', 'qh', 'kh', 'ah', '2d', '3d', '4d',
    '5d', '6d', '7d', '8d', '9d', '10d', 'jd', 'qd', 'kd', 'ad', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', '10c', 'jc', 'qc',
    'kc', 'ac', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', '10s', 'js', 'qs', 'ks', 'as',]
let shuffledDeck = [];
let tableCards = [];
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
const pagereturn = 1;
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

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}


function initApp() {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        // The signed-in user info.
        user = result.user;
    }).catch(function (error) {
        errorCode = error.code;
        errorMessage = error.message;
        email = error.email;
        credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
        } else {
            console.error(error);
        }
    });
    // Listening for auth state changes.
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

            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');

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
// Check that the given Facebook user is equals to the  given Firebase user

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
//
//  * initApp handles setting up UI event listeners and registering Firebase auth listeners:
//  *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
//  *    out, and that is where we update the UI.
//  */
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
FB.init({
    appId: 2642487855777641,
    status: true,
    xfbml: true,
    version: 'v2.6'
});
FB.Event.subscribe('auth.authResponseChange', checkLoginState);
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
const PlayerRoom = DB.ref("/currentPlayers") //a sub directory with current players
const connectedRef = DB.ref(".info/connected");
const loggedInRef = DB.ref(".info/loggedIn");
const gameState = DB.ref("gameState");
connectedRef.on("value", snapshot => { //assign user IDs  //THIS IS THE MULTIPLAYER FUNCTIONALITY
    if (snapshot.val()) {
        const connection = connectionRef.push(true);
        game.localID = connection.key;
        connection.onDisconnect().remove();
    }
});
loggedInRef.on('value', snapshot => {
    if (snapshot.val()) {
        DB.ref('/loggedIn').push({
            localId: game.localId,
            playerName: snapshot.displayName,
        })
    }
})
playerRoom.on("value", "THIS IS WHERE SEAT WILL GO", event => {
    event.preventDefault();
    const playerSeat = event.target.seatNumber;
    const player = {
        playerSeat: `player${playerSeat}`,
    };
    game.localPlayerSeat = playerSeat;
    playerJoinNumber++
    // if (event.target.seatNumber === 1) {
    // playerRoom.ref().push({

    //})
    //}
    DB.ref(`playerRoom/${game.localID}`).update(player);
});
function game() {
    function newHand() {
        handDeal(); //uses new deck, deals hands to all connected players
        potTotal = 2; //a new pot
        newDeck = [''];
    }
    function handDeal() {    //the array for playerHand. >>How will it know which player hand to sort too? possible to make a variable with like an [i] item so it can sort through?
        //or a function to create player hand arrays based on log in connections, through a loop probably, and then a loop to deal the cards as well?
        activePlayers = [];
        const newDeck = [...cardDeck];  //uses the card deck, but in a way where we can mess with it 
        let cardSelector = (Math.floor(0 - newDeck.length) + 1); //picks a random card out of the deck
        shuffledDeck.push(newDeck.splice(cardSelector, 1)); //pushes it to shuffledDeck
        if (!(playerNumber * 2) === playercardNumbers) { //if there are not  two cards dealt for every player
            for (i = 0; i <= (playerNumber * 2); i++) // a loop to run for every player x2
                shuffledDeck.push(newDeck.splice(cardSelector, 1));
            playerhand[i].push(newDeck.splice(cardSelector, 1));   //how to loop through players?? //FOR CLASS 

        }
        blindSwitch();
        player.smallblind.potTotal - 2;
        potTotal = potTotal + 2;
    }
    function turnDeal() { //the new deal for the hand
        dealCount++
        if (dealCount === 1) {
            tableCards.push(shuffledDeck(0, 1, 2));
            shuffledDeck.splice(0, 3);           //check splice syntax, should remove cards from deck and put on table //checked but doublecheck?
        }
        else {
            tableCards.push(shuffledDeck(0));
            shuffledDeck.splice(0, 1);
        }
        drawFunctionCount++ //used by the handselect function to count how many deals have gone out, at 3 is a requirement for the on card click function to activate
    }
    function nextTurn() {
        if (callCount === activePlayer.length) {
            turnDeal();
        }

    }
    function bet() {
        if (this.playerNumber === you) {               //Available move functions
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
        //   if (localId === ) {
        if (!playerhand === ['']) { //if ya got cards
            potTotal = potTotal + raiseValue; //add the raised value to the pot
            playerTotal = playerTotal - raiseValue; //grab it out the player val
            currentBet + 4; //add the raise to the call value
            nextTurn(); //switch player turns
        }
    }

    function call() {
        if (this.playerNumber === you) {
            if (!playerhand === [''] & (!currentBet === 0)) { //if ya got cards, someone bet -
                potTotal = currentBet + potTotal; //add the current bet to pot
                playerTotal = playerTotal - currentBet; //grab it out the hand
                callCount++ //this variable is used to determine when the next draw function should occur, when callCount === playerNumber
                nextTurn(); //nex tturn
            };
        };
    };
    function check() {
        //  if (//whoevers turn in firebase === playerSeat) {
        if (currentBet === 0) { //if no one has bet
            nextTurn() //trade turns
            //  }
        }
    }
    function fold() {
        if (game.localId === local.Id) {
            if (!playerhand === ['']) { //if ya got cards
                playerhand = ['']; //now ya don't
                nextTurn(); //next turn
                activePlayer.split(this.localPlayerNumber); //splits player out of active array
            };
        }
    }
    function blindSwitch() {    //this will just end up as an infinite loop of moving 
        //A LOOP THAT ON NEW DEAL PUSHES DEALER (AND BLINDS) OVER ONE
    }
    function newHand() { //a function to set the used deck back to full array and begin the deal function
        //rotates the blinds and dealer down one
        handDeal(); //uses new deck, deals hands to all connected players
        potTotal = 2; //a new pot
        newDeck = [''];
    }
    function handCompare() {
        //loop through all possible combos of the 7 available cards
        //pull the highest value and assign it to player in firebase
    }
    function victory() {
        //winningPlayer.playerTotal+potTotal
        potTotal = 0
        newHand();
    }
    handDeal();
}
game();
console.log('hello 2')

//chat function
//show name function
$('submitButton').on('click', function (event) {  //on click of chat submit
    event.preventDevault(); //dont refresh pls
    textInput = $('#textInput').val().trim(); //take the value from the chat input
    database.ref('/chat').push({
        newTextMessage: textInput,  //push to the newTextMessage var in chat branch
    },
        function (errorObject) {  //handle errors
            console.log(errorObject);
        })
});
database.ref('/chat').on('child_added', function (childSnap) { //when message sent to firebase
    $('#chatDiv').append('<p>' + currentPlayer + 'says: ' + childSnap.val().newTextMessage + '</p>');//apend chat to box
});
$('clearButton').on('click', function (event) {
    database.ref('/chat').clear();
});

//when they hjoin push them to the active array
//in the javascript list big blinf small dealer in gamestate on firebase
//if your position = bigblind 


//TO DO:
//Blind switch function
// hand deal function
// hand compare function
// win function