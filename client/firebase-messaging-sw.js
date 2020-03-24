/* eslint-disable no-undef */
/*
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.
 */

// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCZyC25ARK35BGd-d5rGFbNSuRkJEWajfQ',
  authDomain: 'test-1a69b.firebaseapp.com',
  databaseURL: 'https://test-1a69b.firebaseio.com',
  projectId: 'test-1a69b',
  storageBucket: 'test-1a69b.appspot.com',
  messagingSenderId: '188441369188',
  appId: '1:188441369188:web:b326ab0f8b040306c65d71',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey('BI9LJcG-expknac7mq8wJ8LL5D4z53ufudgpAwUrLGC2biX-Qa_GqzySAwXFoyKGDD-PGQKxCc3QMgWGraE9JVM');

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/client/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
