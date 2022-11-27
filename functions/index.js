
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

//          CREATE FRIENDS DOC FOR NEW USER
exports.createFriendsDoc = functions.auth.user().onCreate((user) => {
  db.collection("friends")
      .doc(user.uid)
      .set({"friends": []});
});

exports.createGamesPlayedDoc = functions.auth.user().onCreate((user) => {
  db.collection("gamesPlayed")
      .doc(user.uid)
      .set({"gamesPlayed": []});
});


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
