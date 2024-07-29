import { inject, Injectable, OnInit } from '@angular/core';
import { fromString, Role } from './role.eum';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../assets/model';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';
  private role: Role | undefined;

  baseUrl = 'https://djh-back-efa995316149.herokuapp.com/';

  router= inject(Router);
  http = inject(HttpClient)

  constructor() { 
   this.isAuthenticated = !!localStorage.getItem(this.authSecretKey);
   
  }

  
  async login(username: string, password: string): Promise<boolean> {
   const res = await lastValueFrom(this.http.post<any>(this.baseUrl + 'auth/login',{username: username, password:password}));
   console.log(res);
   if(res){
    const authToken = res.access_token;
    localStorage.setItem(this.authSecretKey, authToken);
    this.isAuthenticated = true;
    const role = await this.getUserRole(authToken);
    if(role){
      const roleEnum = fromString(role);
      if(roleEnum){
        this.role = roleEnum;
      }
    }
    return true;
   }
   return false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  async getRole():Promise<Role | undefined>{
    const token = localStorage.getItem(this.authSecretKey)
    if(token){
      const role = await this.getUserRole(token);
      if(role){
        const roleEnum = fromString(role);
        if(roleEnum){
          this.role = roleEnum;
        }
      return this.role;
    }
  }
  return undefined;

  }

  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  private async getUserRole(token: string): Promise<string | null> {
    try {
      const decoded = jwtDecode<any>(token);
      console.log('Decoded JWT:', decoded);
      return decoded.role;
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }
}