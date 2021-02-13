import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import firebase from 'firebase/app'
import "firebase/auth"
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth=false
  id:string
  userSub: Subscription
  user: any

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSub=this.authService.userSubject.subscribe(
      (user)=>{
        if(user){
          console.log('Header: user reçu. Plus précisemment on reçoit '+user.email)
          this.isAuth=true
        }else{
          this.isAuth=false
        }
      }  
    )
  }

  onListe(){
    this.router.navigate(['/taches'])
  }
  onDeconnecte(){
    this.router.navigate(['/accueil'])
    this.authService.signOut()
  }
  
}
