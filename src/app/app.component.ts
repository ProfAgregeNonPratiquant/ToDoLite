import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {slideAnimation } from './animations'
import firebase from 'firebase/app'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation]
})
export class AppComponent {
  
  constructor(){var firebaseConfig = {
    apiKey: "AIzaSyADiWSYURTENiDzTuV_yRwAA10MPlpsUyA",
    authDomain: "todolite-b9dbd.firebaseapp.com",
    databaseURL: "https://todolite-b9dbd.firebaseio.com",
    projectId: "todolite-b9dbd",
    storageBucket: "todolite-b9dbd.appspot.com",
    messagingSenderId: "330896399215",
    appId: "1:330896399215:web:99706278beb86bc5a8669a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
