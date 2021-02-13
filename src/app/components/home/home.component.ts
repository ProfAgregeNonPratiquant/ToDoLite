import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import firebase from "firebase/app";
import { TachesService } from 'src/app/services/taches.service';
import { Tache } from 'src/app/models/tache/tache.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tachesService: TachesService
    ) { }

  userSub: Subscription
  user: firebase.User

  tachesSub: Subscription
  taches: Tache[]

  doneSub: Subscription
  done: Tache[]

  dernieresTaches = []
  lastDone: Tache[]

  lastId = []

  ngOnInit(): void {
    this.userSub=this.authService.userSubject.subscribe(
      (user)=>{
        this.user=user
        this.tachesSub=this.tachesService.tachesSubject.subscribe(
          (taches)=>{
              this.taches=taches
              this.dernieresTaches = this.getLastAddedTasks()
              this.lastId = [this.taches.length-1 , this.taches.length-2]
            
          }
        )
        
        this.tachesService.emitTachesSubject()
      }
    )
    this.authService.emitUser()  
  }

  getLastAddedTasks() {
    var T:Tache[]=[]
    for (let i = 0; i < 2 && i<this.taches.length; i++) {
      const j = this.taches.length-i-1 
      T.push(this.taches[j]); 
    }
    return T
  }

  


  getLastDoneTasks() {
    var T:Tache[]=[]
    for (let i = 0; i < 3 && i<this.done.length; i++) {
      const j = this.done.length-i-1
      T.push(this.done[j]); 
    }
    return T
  }

  
}




