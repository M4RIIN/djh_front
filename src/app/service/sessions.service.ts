import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SessionsService{
    http = inject(HttpClient)
    private authSecretKey = 'Bearer Token';
    baseUrl = 'https://djh-back-efa995316149.herokuapp.com/';
    constructor(){

    }

    getAllSessions(){
        const token = localStorage.getItem(this.authSecretKey);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any[]>(this.baseUrl + "sessions", {headers})
    }

    createSession(sujet : string){
        const token = localStorage.getItem(this.authSecretKey);
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<any>(this.baseUrl + "sessions",{sujet: sujet} ,{headers})
    }
}