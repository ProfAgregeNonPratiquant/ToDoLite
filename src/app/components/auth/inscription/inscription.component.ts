import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth"
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }
  
  formulaireInscription: FormGroup 
  ngOnInit(){
    this.formulaireInscription =  this.formBuilder.group(
      {
        'email': ['',Validators.required],
        'motDePasse': ['',Validators.required]
      }
    )
  }
  error: string
  onSoumission(){
    const email = this.formulaireInscription.get('email').value 
    const motDePasse = this.formulaireInscription.get('motDePasse').value

    this.authService.newUser(email,motDePasse).then(
      (user: firebase.auth.UserCredential)=>{
        console.log(user.user.email+' vient de s\'inscrire! ')
        this.authService.signIn(email,motDePasse).then(
          ()=> {
            this.router.navigate(['home'])
          },
          (error: any)=>this.error=error
        )
        
      },
      (error)=>{
        console.log(error)
        this.error=error.message
      }
    )  
  }
  onRetour(){
    this.router.navigate(['accueil'])
  }
}
