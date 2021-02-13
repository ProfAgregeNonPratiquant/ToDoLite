import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
 
import { AppComponent } from './app.component';
import { TachesComponent } from './components/taches/taches.component';
import { NouvelleTacheComponent } from './components/nouvelle-tache/nouvelle-tache.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EditerTacheComponent } from './components/editer-tache/editer-tache.component';
import { TachesService } from './services/taches.service';
import { AuthService } from './services/auth.service';
import { InscriptionComponent } from './components/auth/inscription/inscription.component';
import { ConnectionComponent } from './components/auth/connection/connection.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TacheComponent } from './components/tache/tache.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes : Routes=[
  {path:'',component: AccueilComponent},
  {path:'accueil',component: AccueilComponent, data: {animation: 'accueil'}},
  {path: 'inscription', component: InscriptionComponent,data: {animation: 'inscription'}},
  {path:'connection', component:ConnectionComponent,data: {animation: 'connection'}},
  {path: 'home', canActivate:[AuthGuardService], component: HomeComponent},
  {path: 'taches',canActivate:[AuthGuardService], component: TachesComponent},
  {path: 'nouvelleTache',canActivate:[AuthGuardService], component: NouvelleTacheComponent},
  {path: 'taches/:id',canActivate:[AuthGuardService], component: EditerTacheComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TachesComponent,
    NouvelleTacheComponent,
    HeaderComponent,
    AccueilComponent,
    EditerTacheComponent,
    InscriptionComponent,
    ConnectionComponent,
    TacheComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    TachesService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
