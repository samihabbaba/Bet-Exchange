import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private dataService:DataService) { }

  
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  logInSuccess=false;

  performLogIn(loginModel?:any) {
    let loginURL = 'https://api.vebobet.com/';
    let model = {
      username: 'DiscTest',
      password: 'Disc123!',
    };
debugger
    if(loginModel){
      model.username = loginModel.username,
      model.password = loginModel.password
    }

    this.login(model).subscribe(
      (resp) => {
        debugger
        const user: any = resp.body;
        localStorage.setItem('token', user.token);

        this.dataService.httpOptions.headers = new HttpHeaders({
          Authorization: 'Bearer ' + user.token,
        });

        if (user.token) {
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          // const role = this.decodedToken.role;      
          localStorage.setItem("token", user.token);
          this.logInSuccess = true;
        }
        else{
          this.logInSuccess = false;
        }

      },
      (error) => {
        debugger
        this.logInSuccess = false;

      }
    );
  }

  login(model: any) {
    let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
    return this.http.post(loginURL, model, {
      observe: 'response',
    });
  }

  logut(){
    this.decodedToken = null;
    localStorage.removeItem('token');

   this.dataService.httpOptions.headers = new HttpHeaders({
      Authorization: 'Bearer ',
    });
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return !this.jwtHelper.isTokenExpired(token);  
    }
    else{
      return false;
    }
  }

}
