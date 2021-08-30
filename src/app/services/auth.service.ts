import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { SignalRNotificationsService } from './signal-r-notifications.service';
import { SharedFunctionsService } from './shared-functions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http:HttpClient, private dataService:DataService,
    private route:Router,
    private signalRNoti:SignalRNotificationsService,
    private notificationService: NotificationService,
    private sharedService:SharedFunctionsService
    ) { }

  
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  logInSuccess=false;
  currentUserInfo:any = {
    balance:'',
    currency:'',
    userName:'',
    parentCommission:0
  }

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
     async (resp) => {

        const user: any = resp.body;
        localStorage.setItem('token', user.token);

        this.dataService.httpOptions.headers = new HttpHeaders({
          Authorization: 'Bearer ' + user.token,
        });

        
        this.httpOptions.headers = new HttpHeaders({
          Authorization: 'Bearer ' + user.token,
        });

        if (user.token) {

          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUserInfo.balance = this.decodedToken.balance;
          this.currentUserInfo.currency = this.decodedToken.currency;
          this.currentUserInfo.userName = this.decodedToken.sub;

          // const role = this.decodedToken.role;      
          localStorage.setItem("token", user.token);
          
          let dataLoaded = await this.initializeData();
          if(dataLoaded){
            this.logInSuccess = true;
            this.route.navigateByUrl('home')
            .then(async () =>  {
              await this.delay(300);
              window.location.reload();
            });
          }else{
            this.logInSuccess = false;
            this.notificationService.error('Error while Logging to the system',5000);  
          }
          this.updateCurrentBalance();
        }
        else{
          this.logInSuccess = false;
          this.notificationService.error('Wrong Username Or Password',5000);
        }

      },
      (error) => {
        this.logInSuccess = false;
        // this.notificationService.error('Wrong Username Or Password',5000);
        this.sharedService.showErrorMsg(error,'Wrong Username Or Password')
      }
    );
  }

  login(model: any) {
    // let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
    // let loginURL = 'https://api.xexchange.xyz/auth/login';
    let loginURL = environment.apiUrl+'auth/login';
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

   this.httpOptions.headers = new HttpHeaders({
    Authorization: 'Bearer ',
  });

  this.signalRNoti.stopNotificationListen();
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

  async initializeData(){

    this.signalRNoti.startNotificationListen();
    
    return new Promise((resolve, reject) => {
      resolve(true);
      return;
      this.http.get<any>(`${environment.apiUrl}wallets/`, {
        headers: this.httpOptions.headers,
        observe: 'response',
      }).subscribe(resp =>{

        resolve(true);
      }, error =>{

        // reject(false);
        resolve(false);
      });

   });
  }

  setDecodedToken(){
    let token = localStorage.getItem('token');
    if(token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
      
      this.updateCurrentBalance();
      // this.currentUserInfo.balance = this.decodedToken.balance;
      this.currentUserInfo.currency = this.decodedToken.currency;
      this.currentUserInfo.userName = this.decodedToken.sub;
    }
  }

  redirectToPage(){
    if(this.decodedToken.role == 'SoftwareHolder'){
      return{
        re:true,
        page:'software-holder'
      }
    }
    else if(this.decodedToken.role == 'SuperAdmin'){
      return{
        re:true,
        page:'super'
      }
    }
    else if(this.decodedToken.role == 'Admin'){
      return{
        re:true,
        page:'admin'
      }
    }
    else if(this.decodedToken.role == 'Master'){
      return{
        re:true,
        page:'master'
      }
    }
    else {
      return{
        re:false
      }
    }
  }

  updateCurrentBalance(){

    this.dataService.getUserById(this.decodedToken.id).subscribe(resp => {
      this.currentUserInfo.balance = resp.wallet.balance;
      this.currentUserInfo.parentCommission = (resp.parentCommission + resp.commission)*100;
    },
    error =>{
      this.currentUserInfo.balance = 'Unkown';
    })
  }

  checkTokenValidity(){
    let loginURL = environment.apiUrl+'auth/check-token';
    let token = localStorage.getItem('token');

    this.http.post(loginURL+'?token='+token,{} , {
      observe: 'response',
    }).subscribe(resp => {
      if(resp.status !== 200){
        this.logut()
      }
    },
    error =>{
      this.logut()
    });
  
  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
