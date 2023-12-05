import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {
  constructor(private http:HttpClient){}
  GetToken(){

    return  localStorage.getItem('Token') || '';
  }

  GetUser(){

    return  localStorage.getItem('users') || '';
  }

  a=JSON.parse(this.GetToken()).token;

  apiurl="http://localhost:8080/user/res?secret_token="+this.a;

  getclientNum():Observable<any>{
    return this.http.get("http://localhost:8080/api/clientsNumb");
  }
 
  getCatalogsData(): Promise<any>{

    return this.http.get("http://localhost:8080/api/prosNumb").toPromise();
  }
  getTache():Observable<any>{
    return this.http.get(this.apiurl);
  }
  
  getEvent():Observable<any>{
    return this.http.get("http://localhost:8080/user/resRV?secret_token="+this.a);
  }
  getTotal():Observable<any>{
    return this.http.get("http://localhost:8080/api/total");
  }
  
  getChiffre():Observable<any>{
    return this.http.get("http://localhost:8080/api/chiffre");
  }
  
}
