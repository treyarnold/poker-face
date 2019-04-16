// Initialize Firebase
console.log('helo');
const playerOneName = '';
const playerTwoName = '';
const playerThreeName = '';
const playerFourName = '';
const playerFiveName = '';
const playerSixName = '';
const playerSevenName = '';
const playerEightName = '';
const playerOneHand = [];
const playerTwoHand = [];
const playerThreeHand = [];
const playerFourHand = [];
const playerFiveHand = [];
const playerSixHand = [];
const playerSevenHand = [];
const playerEightHand = [];
const smallBlind = 2;
const bigBlind = 4;
const potTotal = 0;
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
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
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
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
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
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
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
            var errorCode = error.code;
            var errorMessage = error.message;
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
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
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
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function () {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
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
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
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
                var credential = firebase.auth.FacebookAuthProvider.credential(
                    event.authResponse.accessToken);
                // [END facebookcredential]
                // Sign in with the credential from the Facebook user.
                // [START authwithcred]
                firebase.auth().signInAndRetrieveDataWithCredential(credential).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
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
        var providerData = firebaseUser.providerData;
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
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
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
function game() {            //the whole game box, functions first then all the logic yeah?   


    function nameAssign() { //assigns connected users info to playerName variables
        for (i = 0, i < connectionsRef; i++) {
            Player[i].add('id', player[i]);
        }

    }
    //function to deal the cards, on deal will split a card out of the array by random number index, and push it to
    function handDeal() {    //the array for playerHand. >>How will it know which player hand to sort too? possible to make a variable with like an [i] item so it can sort through?
        //or a function to create player hand arrays based on log in connections, through a loop probably, and then a loop to deal the cards as well?

        const newDeck = [...cardDeck];
        let cardSelector = (Math.floor(0 - newDeck.length) + 1);
        shuffledDeck.push(newDeck.splice(cardSelector, 1));
        if (!(connectionsRef * 2) === playercardNumbers) {
            for (i = 0; i <= playernumberx2; i++)
                shuffledDeck.push(newDeck.splice(cardSelector, 1));
            currentPlayer.push(newDeck.splice(cardSelector, 1));   //how to loop through players??

        }

    }
    function nextTurn() {
        //currentPlayer=nextPlayer

    }
    function bet() { //fixed in 4s
        if (!playerhand === ['']) {
            currentBet = 4
            potTotal = potTotal + currentBet;
            playerTotal = playerTotal - currentBet;
            raiseValue = raiseValue + 4;
            nextTurn();
        }
    };
    function raise() {
        if (!playerhand === ['']) {
            potTotal = potTotal + raiseValue;
            playerTotal = playerTotal - raiseValue;
            currentBet + 4;
            nextTurn();
        }
    }
    function check() {
        if (currentBet === 0) {
            nextTurn();
        }
    };
    function fold() {
        if (!playerhand === ['']) {
            playerhand = [''];
            nextTurn();
        };
    }
    function call() {
        if (!playerhand === ['']) {
            potTotal = currentBet + potTotal;
            playerTotal = playerTotal - currentBet;
            nextTurn();


        };
    }
    function handSelect() {
        //on final bet ((if betCou callCountTotal=MaxPlayers and drawFunctionCount === 3 )
        //on click of card class, push to chosenHand array
        //run hand compare function on chosenHand arrays (a forloop to create a new chosenhand[i] for each player in the hand
    }
    //function to compare hands and select victor
    function ha ndCompare() {  //maybe a for loop to sort thru the 7 cards available and by criteria can push them to seperate arrays and based on array with highest value orrr??
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
        blindSwitch();
        handDeal();
        potTotal = 0;
        newDeck = [];
    }
    newHand();
}

game();