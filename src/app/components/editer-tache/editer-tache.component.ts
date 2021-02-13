import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from 'src/app/models/tache/tache.model';
import { TachesService } from 'src/app/services/taches.service';

@Component({
  selector: 'app-editer-tache',
  templateUrl: './editer-tache.component.html',
  styleUrls: ['./editer-tache.component.scss'],
  animations: [
    trigger('openclose',[
      state('open', style({
      })),
    state('close', style({
        height: '0px'
      })),
      transition('close=>open',[
        animate('0.7s ease-out'),
        
      ]),
      transition('open=>close',[
        animate('0.7s ease-in')
      ])
    ])
  ]
})
export class EditerTacheComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('input') nouvelleSousTache: QueryList<any>
  sub:Subscription

  ngAfterViewInit(){
    this.sub=this.nouvelleSousTache.changes.subscribe(
      ()=>{
        this.nouvelleSousTache.last.nativeElement.focus()
      }
    )
  }

  id: number
  tache: Tache=new Tache('')
  tacheSubscription: Subscription

  tacheForm: FormGroup

  nombreDeSousTaches: number
  sousTachesASupprimer:number[]=[]
  
  details=false
  

  constructor(private activatedRoute: ActivatedRoute,
    private tachesService: TachesService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.tacheSubscription = this.tachesService.tachesSubject.subscribe(
      (taches) => {
        this.tache = taches[this.id]
        this.initForm()
        for (let i = 0; i < this.tache.sousTaches.length; i++) {
          const sousTacheControl=this.formBuilder.control(this.tache.sousTaches[i].tache,Validators.required);
          this.getSousTaches().push(sousTacheControl) 
        }
      }
    )
    this.tachesService.emitTachesSubject()
    
  }

  initForm() {
    this.tacheForm = this.formBuilder.group(
      {
        tache: [this.tache.tache, Validators.required],
        sousTaches: this.formBuilder.array([])
      }
    )
  }

  onDetails(){
    this.details=!this.details
  }

  getSousTaches(){
    return this.tacheForm.get('sousTaches') as FormArray
  }

  nouveauSousTacheControl() {
    const sousTacheControl=this.formBuilder.control('', Validators.required);
    this.getSousTaches().push(sousTacheControl)
  }

  onSupprimerSousTache(i){
    this.tache.sousTaches.splice(i,1)
    this.getSousTaches().removeAt(i)
  }

  onAnnuler(){
    this.router.navigate(['/taches'])
  }
  
  onSubmitForm() {
    const formValue=this.tacheForm.value
    const tacheModifiee =new Tache(formValue['tache'])

    if (this.tache.sousTaches.length>0) {
      for (let i = 0; i < this.tache.sousTaches.length; i++) {
        this.tache.sousTaches[i].tache=formValue['sousTaches'][i]
        tacheModifiee.sousTaches[i]=this.tache.sousTaches[i]
      }
      if (this.getSousTaches().length-this.tache.sousTaches.length>0) {
        for (let i = this.tache.sousTaches.length; i < this.getSousTaches().controls.length; i++) {
          tacheModifiee.sousTaches[i] = new Tache(formValue['sousTaches'][i]);
        }
      }
    }
    else{
      if (this.getSousTaches().length>0) {
        for (let i = 0; i < this.getSousTaches().controls.length; i++) {
          tacheModifiee.sousTaches[i] = new Tache(formValue['sousTaches'][i]);
        }
      }
      else{
        tacheModifiee.sousTaches=[]
      }
    }
    this.tachesService.modifierTache(tacheModifiee, this.id)
    this.router.navigate(['/taches'])
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
