import { animate, AnimationAnimateMetadata, AnimationBuilder, AnimationPlayer, style, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from 'src/app/models/tache/tache.model';
import { TachesService } from 'src/app/services/taches.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})

export class TachesComponent implements OnInit {

  @ViewChildren('progression') progressions: QueryList<ElementRef>
  

  
  from=0
  
  details: boolean[]=[]
  constructor(private tachesService: TachesService,private router: Router,private animationBuidler: AnimationBuilder) {}
 
  ngOnInit() { 
    this.tachesSub=this.tachesService.tachesSubject.subscribe(
      (taches)=>{
        this.taches=taches  
      }
    )
    this.tachesService.emitTachesSubject()
    
  }
   
  

  tachesSub:Subscription
  taches:Tache[]=[]

  id: string

  onStatutTache(i:number){
    this.tachesService.changerStatutTache(i)
  }
  onStatutSousTache(i:number,j:number){
    this.tachesService.changerStatutSousTache(i,j)
  }
  
  
  
  
  onDetails(i: number){
   this.details[i]=!this.details[i]
  }
  
  onSupprimerTache(id:number){
     let supprimer: Boolean
    if (!this.taches[id].fait) {
       supprimer = confirm('La tâche n\'est pas complétée, êtes vous certain de vouloir la supprimer?')  
    } else {
      supprimer=true
    }
    if (supprimer){
      this.tachesService.supprimerTache(id)
    }
    
  }
  
  onEditerTache(id: number){
    this.router.navigate(['taches/'+id])
  }
  
  checkTache(i){
    if (this.taches[i].sousTaches.length===0) {
      return true
    }
    else{
      var check=true
      for (let j = 0; j <this.taches[i].sousTaches.length; j++) {
        check=check  && this.taches[i].sousTaches[j].fait
      }
      return check
    }
  }
  getProgress(i:number){
    var k=0
    if (this.taches[i].sousTaches.length>0) {
      for (let j = 0; j < this.taches[i].sousTaches.length; j++) {
        if(this.taches[i].sousTaches[j].fait){
          k=k+1
        }   
      }
    }
    const progress = k/this.taches[i].sousTaches.length
    return progress+this.from
  }
  
  
  

  ngOnDestroy(){
    this.tachesSub.unsubscribe()
    this.tachesService.sauvegarderTachesSurDatabase()
  }

}