import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private dataService:DataService,
    private route:Router,
    private notificationService: NotificationService
    ) { }

  
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  logInSuccess=false;

  performLogIn(loginModel?:any) {
    let loginURL = 'https://api.vebobet.com/';
    let model = {
      username: 'DiscTest',
      password: 'Disc123!',
    };

    if(loginModel){
      model.username = loginModel.username,
      model.password = loginModel.password
    }

    this.login(model).subscribe(
      (resp) => {

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
          this.route.navigateByUrl('home')
        }
        else{
          this.logInSuccess = false;
          this.notificationService.error('Wrong Username Or Password',5000);
        }

      },
      (error) => {
        this.logInSuccess = false;
        this.notificationService.error('Wrong Username Or Password',5000);
      }
    );
  }

  login(model: any) {
    let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
    return this.http.post(loginURL, model, {
      observe: 'response',
    });
  }

  logut(routeAfter = true){
    this.decodedToken = null;
    localStorage.removeItem('token');

   this.dataService.httpOptions.headers = new HttpHeaders({
      Authorization: 'Bearer ',
    });

    if(routeAfter){
      this.route.navigateByUrl('login')
    }
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
