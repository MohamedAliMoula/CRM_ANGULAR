import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  GetToken(){

    return  localStorage.getItem('Token') || '';
  }

  GetUser(){

    return  localStorage.getItem('users') || '';
  }

  a=JSON.parse(this.GetToken()).token;

  apiurl='http://localhost:8080/user/eventUser/'+this.GetUser()+"?secret_token="+this.a;
    constructor(private http : HttpClient,private router:Router) { }
  postProduct(data :any){
    return this.http.post<any>("http://localhost:8080/api/event",data);
  }
  // get event de chaque user
  getProduct():Observable<any>{
    return this.http.get(this.apiurl);
  }
  //modif event
  putProduct(EVTNO: number,data:any){


    return this.http.put<any>("http://localhost:8080/api/event/"+EVTNO ,data);
  }
  deleteProduct(EVTNO:number){
    return this.http.delete<any>("http://localhost:8080/api/event/"+EVTNO);
}
//liste des etablissements
getEtb():Observable<any>{
  return this.http.get("http://localhost:8080/api/ETB");
}
//get client (nom et code)
getCli():Observable<any>{
  return this.http.get("http://localhost:8080/api/clients");
}
//get pros (nom et code)
getProspet():Observable<any>{
  return this.http.get("http://localhost:8080/api/prospects");
}
//tous les champ
getClient():Observable<any>{
  return this.http.get("http://localhost:8080/api/cli");
}
getProspects():Observable<any>{
  return this.http.get("http://localhost:8080/api/prospe");
}
//ajouter prospect
postProspect(data :any){
  return this.http.post<any>("http://localhost:8080/api/prospect",JSON.parse(JSON.stringify(data)));
}
putProspect(id :string,data:any){
  return this.http.put<any>("http://localhost:8080/api/prosp/"+id,data);
}
updateclient(id :string,data:any){
  return this.http.put<any>("http://localhost:8080/api/client/"+id,data);
}
//delete Prospect
deleteProspect(id:String){
  return this.http.delete<any>("http://localhost:8080/api/prospect/"+id)
}
deleteclient(id:String){
  return this.http.delete<any>("http://localhost:8080/api/client/"+id)
}
geteventTiers(x :string):Observable<any>{
  return this.http.get("http://localhost:8080/user/event/"+x+"?secret_token="+this.a);
}
getclientTiers(TIERS:string):Observable<any>{

  return this.http.get("http://localhost:8080/api/cli/"+TIERS);

}
getprospectTiers(TIERS:string):Observable<any>{
  return this.http.get("http://localhost:8080/api/pros/"+TIERS);

}
getArticle():Observable<any>{
  return this.http.get("http://localhost:8080/api/articles");
}
//get article(prix,nom)
getArtNP():Observable<any>{
  return this.http.get("http://localhost:8080/api/artNP");
}
addDevis(data :any){
  return this.http.post<any>("http://localhost:8080/api/devis",data);
}
getDevis():Observable<any>{
  return this.http.get<any>("http://localhost:8080/api/devis")
}
deleteDevis(id:number){
  return this.http.delete<any>("http://localhost:8080/api/devi/"+id)
}
getDevisart(id:number):Observable<any>{
  return this.http.get<any>("http://localhost:8080/api/devis/"+id)
}
deleteArticle(id:number){
  return this.http.delete<any>("http://localhost:8080/api/deviArt/"+id)
}

updateDev(data:any){
  return this.http.post<any>("http://localhost:8080/api/art",data);
}
}
