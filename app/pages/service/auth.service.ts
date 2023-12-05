import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
//declarer les fonction pour chaque route
export class AuthService {
  apiurl ="http://localhost:8080/api/login"

  constructor(private http :HttpClient,    private router: Router
    ){}
    // envoyer les coordonnées d'un user
  proceedLogin(usercred:any){

  return this.http.post(this.apiurl, usercred)

  }
  //4let*
  getArticle():Observable<any>{
    return this.http.get("http://localhost:8080/api/articles");
  }
  //verifier si le token existe ou nn dans local storage
  IsloggedIn(){
    return localStorage.getItem('Token')!=null ;
  }
  GetToken(){
    return  localStorage.getItem('Token') || '';
  }
  //decnx et effacer token 
  logout() {
    localStorage.removeItem("Token");
    this.router.navigate(['/auth'], {
      queryParams: {},
    });
  }
}
