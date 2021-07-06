import * as firebase from 'firebase/app';
import 'firebase/auth';

declare global {
  interface Window {
    recaptchaVerifier: any;
    recaptchaWidgetId: any;
  }
}

export const initializeFirebaseApp = () => {
  const config = {
    apiKey: 'AIzaSyA9WZB5N6ekNxyN3yGaUwjuBilvXItUv38',
    authDomain: 'fir-auth-article.firebaseapp.com',
    databaseURL: 'https://fir-auth-article.firebaseio.com',
    projectId: 'fir-auth-article',
    storageBucket: 'fir-auth-article.appspot.com',
    messagingSenderId: '774252759419',
    appId: '1:774252759419:web:e014ddfa3553a4832a15de',
    measurementId: 'G-77Z5WJ0SET',
  };

  firebase.initializeApp(config);
};

export const firebaseAuth = firebase.auth;
