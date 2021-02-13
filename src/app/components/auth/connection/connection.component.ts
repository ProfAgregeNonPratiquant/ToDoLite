import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth"
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  formulaireConnection: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.formulaireConnection = this.formBuilder.group(
      {
        'email': [''],
        'motDePasse': ['', Validators.required]
      }
    )
  }

  error: string
  onSoumission(){
    const email = this.formulaireConnection.get('email').value
    const motDePasse = this.formulaireConnection.get('motDePasse').value

    this.authService.signIn(email,motDePasse).then(
      (user:firebase.auth.UserCredential)=>{
        console.log(user.user.email+' vient de se connecter!')
        this.router.navigate(['home'])
      },
      (error)=>{
        console.log(error)
        this.error=error.message
      }
    )
  }
  onRetour(){
    this.router.navigate(['home'])
  }
}
