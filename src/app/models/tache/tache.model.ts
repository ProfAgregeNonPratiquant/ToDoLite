export class Tache {
  tache :string
  fait: boolean
  sousTaches: Tache[] 
  
  constructor(tache: string) {
    this.tache=tache
    this.fait=false
    this.sousTaches=[]
  }
  
 }
