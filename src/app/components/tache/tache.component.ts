import { animate, AnimationBuilder, keyframes, style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/app';
import "firebase/database"

import { Tache } from 'src/app/models/tache/tache.model';

import { TachesService } from 'src/app/services/taches.service';
import {openClose, toggle} from './animations'

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.scss'],
  animations: [openClose, toggle]
})
export class TacheComponent implements OnInit{
  @Input() id: number
  @Input() tache: Tache
  @ViewChild('progression') progression: ElementRef
  @ViewChild('supprimer') supprimer: ElementRef
  @ViewChild('deplacer') deplacer: ElementRef


  constructor(private tachesService: TachesService,
    private router: Router,
    private builder: AnimationBuilder) { }

  
  
  
  
  detail = false
  

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.changeLoadStatus(this.from,this.getProgress())
    console.log('Afterview')
  }

  onStatutTache() {
    this.tachesService.changerStatutTache(this.id)
    this.changeLoadStatus(this.from, this.getProgress())
  }
  onStatutSousTache(j: number) {
    this.tachesService.changerStatutSousTache(this.id, j)
    this.changeLoadStatus(this.from, this.getProgress())
    if(this.tache.fait===true){
      this.onStatutTache()
    }
    
  }
  onDetail(i: number) {
    this.detail = !this.detail
    console.log(this.detail)
  }
  onSupprimerTache() {
    let supprimer: Boolean
    if (!this.tache.fait) {
      supprimer = confirm('La tâche n\'est pas complétée, êtes vous certain de vouloir la supprimer?')
    } else {
      supprimer = true
    }
    if (supprimer) {
      this.tachesService.supprimerTache(this.id)
    }

  }
  onEditerTache() {
    this.router.navigate(['taches/' + this.id])
  }
  checkTache() {
    if (this.tache.sousTaches.length === 0) {
      return true
    }
    else {
      var check = true
      for (let j = 0; j < this.tache.sousTaches.length; j++) {
        check = check && this.tache.sousTaches[j].fait
      }
      return check
    }
  }

  getProgress(): number {
    let k: number = 0;
    const aFaire = this.tache.sousTaches.length;
    

    if (aFaire > 0) {
      for (let j = 0; j < aFaire; j++) {
        if (this.tache.sousTaches[j].fait) {
          k++
        }
      }
    }
    if(this.tache.fait) k++

    const progress = k / (aFaire+1);


    return progress
  }

  from = 0
  loadStatusTo(from: number, to: number) {
    return [
      style(
        {
          transform: 'skew(-45deg) scaleX(' + from + ')'
        }
      ),
      animate(
        500,
        style(
          {
            transform: 'skew(-45deg) scaleX(' + to + ')'
          }
        )
      )
    ]
  }
  
  changeLoadStatus(from: number, to: number) {
    const loadFactory = this.builder.build(this.loadStatusTo(from, to))
    const loadPlayer = loadFactory.create(this.progression.nativeElement)
    loadPlayer.play()
    loadPlayer.onDone(
      () => {
        this.from = to
        if (to === 1) {
          this.tachesService.supprimerTache(this.id)
        }
      }
    )
  }
  
  onSave() {
    this.tachesService.sauvegarderTachesSurDatabase()
  }
  ngOnDestroy() {
    this.tachesService.sauvegarderTachesSurDatabase()
  }
}