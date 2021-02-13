import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    console.log('AuthService: construction')
    firebase.auth().onAuthStateChanged(
      (user)=>{
        this.user=user
        console.log(user?'info auth service :'+this.user.email:'plus personne')
        console.log('AuthService: partage de ce statut')
        this.emitUser()
      }
    )
  }
  
  private user:firebase.User
  userSubject=new Subject<firebase.User>()
  emitUser(){
    this.userSubject.next(this.user)
  }

  newUser(email: string, password: string){
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  }

  
  signIn(email:string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email,password)
  }
  
  signOut(){
    return firebase.auth().signOut()
  }
  /*
  signOut(){
    return new Promise(
      (resolve, reject) => {
        const connectedUser=firebase.auth().currentUser
        firebase.auth().signOut().then(
          ()=>{
            this.emitUser()
            resolve(this.user.email+' vient de se déconnecter')
          },
          (error)=>{
            reject(error)
          }
        )
      }
    )
  }
  */
}



