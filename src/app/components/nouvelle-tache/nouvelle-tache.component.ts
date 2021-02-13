import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from 'src/app/models/tache/tache.model';
import { AuthService } from 'src/app/services/auth.service';
import { TachesService } from 'src/app/services/taches.service';

@Component({
  selector: 'app-nouvelle-tache',
  templateUrl: './nouvelle-tache.component.html',
  styleUrls: ['./nouvelle-tache.component.scss']
})
export class NouvelleTacheComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChildren('input') nouvelleSousTache: QueryList<any>
  sub:Subscription

  ngAfterViewInit(){
    this.sub=this.nouvelleSousTache.changes.subscribe(
      ()=>{
        this.nouvelleSousTache.last.nativeElement.focus()
      }
    )
  }

  tacheForm: FormGroup

  userSub: Subscription
  user:any

  constructor(private formBuilder: FormBuilder,
    private tachesService: TachesService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm()
    
  }

  initForm(){
    this.tacheForm=this.formBuilder.group(
      {
        tache:['', Validators.required],
        sousTaches: this.formBuilder.array([])
      }
    )
    
    
  }

  onSubmitForm(){
    const formValue=this.tacheForm.value
    const nouvelleTache= new Tache(formValue['tache'])
    const sousTaches: Tache[]=[]
    
    if (formValue['sousTaches'].length>0) {
      for (let i = 0; i < formValue['sousTaches'].length; i++) {
        nouvelleTache.sousTaches[i] = new Tache(formValue['sousTaches'][i]);
      }
    }
    else{
      nouvelleTache.sousTaches =sousTaches
    }
    this.tachesService.nouvelleTache(nouvelleTache)
    this.router.navigate(['/taches'])
  }

  getSousTaches(){
    return this.tacheForm.get('sousTaches') as FormArray
  }  
  
  nouveauSousTacheControl(){
    const nouvellesousTacheControl=this.formBuilder.control('',Validators.required)
    this.getSousTaches().push(nouvellesousTacheControl);  
  }
  
  onSupprimerSousTache(i:number){
    this.getSousTaches().removeAt(i)
  }

  
  
  onAnnuler(){
    this.router.navigate(['/taches'])
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
