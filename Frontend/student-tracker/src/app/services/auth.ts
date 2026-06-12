import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:5000/api/auth";

  constructor(private http: HttpClient, private router: Router) {}

  

  register(data:any){
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token:string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");
  }
  login(data: any) {
  return this.http.post("http://localhost:5000/api/auth/login", data);
}
}
