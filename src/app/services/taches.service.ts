import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Tache } from '../models/tache/tache.model';
import { AuthService } from './auth.service'
import firebase from 'firebase/app';
import "firebase/database"

@Injectable({
  providedIn: 'root'
})
export class TachesService {

  taches: Tache[] = []
  tachesSubject = new Subject<Tache[]>()

  user:firebase.User
  userSub:Subscription
  uid:string=''

  constructor(private authService: AuthService) {
    this.userSub=authService.userSubject.subscribe(
      (user)=>{
        if(user){
          this.user=user
          this.uid=user.uid
          this.chargerTachesDepuisDatabase().then(
            (taches)=>{
              this.taches=taches
              this.emitTachesSubject()
            }        
          )
        }
        else {
          this.taches = []
        }   
      }
    )
    authService.emitUser()
  }

 

  sauvegarderTachesSurDatabase(){
    firebase.database().ref('/users/'+this.uid).set(this.taches)
  }

  chargerTachesDepuisDatabase(){
    return new Promise<Tache[]>(
      (resolve,reject)=>{
        firebase.database().ref('/users/'+this.uid).once(
          'value',(snapshot)=>{
            if (snapshot.exists()) {
              for (let i = 0; i < snapshot.val().length; i++) {
                const tache = new Tache('')
                const snapshotTraduit=Object.assign(tache,snapshot.val()[i])
                this.taches[i]=snapshotTraduit
              }       
            }
            else{
              this.taches=[]            
            }
            resolve(this.taches)
          },
          (error: any)=>{
            reject(error)
          }
        )
      }
    );
  }

  emitTachesSubject() {
    this.tachesSubject.next(this.taches)
  }

  nouvelleTache(tache: Tache) {
    this.taches.push(tache)
    this.sauvegarderTachesSurDatabase()
    this.emitTachesSubject()
  }

  supprimerTache(id: number) {
    this.taches.splice(id, 1)
    this.sauvegarderTachesSurDatabase()
    this.emitTachesSubject()
  }
  modifierTache(tache: Tache, id: number) {
    this.taches[id] = tache
    this.sauvegarderTachesSurDatabase()
    this.emitTachesSubject()
  }
  changerStatutTache(id:number){
    this.taches[id].fait=!this.taches[id].fait
    this.sauvegarderTachesSurDatabase()
    this.emitTachesSubject()
  }
  changerStatutSousTache(id:number,j:number){
    this.taches[id].sousTaches[j].fait=!this.taches[id].sousTaches[j].fait
    this.sauvegarderTachesSurDatabase()
    this.emitTachesSubject()
  }

  

}
