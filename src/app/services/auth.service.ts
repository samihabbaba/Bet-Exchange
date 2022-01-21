import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, Subject, timer } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { SignalRNotificationsService } from './signal-r-notifications.service';
import { SharedFunctionsService } from './shared-functions.service';
import { BetSlipService } from './bet-slip.service';
import { LiveFeedService } from './live-feed.service';
import { takeUntil } from 'rxjs/operators';

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
    private sharedService:SharedFunctionsService,
    private betSlipService:BetSlipService,
    private liveFeedService:LiveFeedService
    ) { }

  
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  logInSuccess=false;
  currentUserInfo:any = {
    balance:'',
    currency:'',
    userName:'',
    parentCommission:0,
    minRisk:0,
    maxRisk:100
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
          this.updateCurrency()

          // const role = this.decodedToken.role;      
          localStorage.setItem("token", user.token);
          this.timerStart();


          let dataLoaded = await this.initializeData();
          if(dataLoaded){
            this.loginConnections();
            this.logInSuccess = true;
            this.route.navigateByUrl('home')
            .then(async () =>  {
              // await this.delay(300);
              // window.location.reload();
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
    this.timerStop(false);
    localStorage.removeItem('token');

    this.dataService.httpOptions.headers = new HttpHeaders({
      Authorization: 'Bearer ',
    });

   this.httpOptions.headers = new HttpHeaders({
    Authorization: 'Bearer ',
  });

  // this.signalRNoti.stopNotificationListen();
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

    // this.signalRNoti.startNotificationListen();
    this.loadOpenBets();

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

  loginConnections(){
    this.signalRNoti.connectToNotificationsHub()
    this.liveFeedService.connectToLiveFeed();
    this.sharedService.loadSports();
  }

  setDecodedToken(){
    let token = localStorage.getItem('token');
    if(token){
      this.decodedToken = this.jwtHelper.decodeToken(token);
      
      this.updateCurrentBalance();
      // this.currentUserInfo.balance = this.decodedToken.balance;
      this.currentUserInfo.currency = this.decodedToken.currency;
      this.currentUserInfo.userName = this.decodedToken.sub;
      this.updateCurrency();
      this.timerStart();
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
      this.currentUserInfo.parentCommission = +((resp.parentCommission + resp.commission)*100).toFixed(2);
      this.currentUserInfo.minRisk = resp.minRisk,
      this.currentUserInfo.maxRisk = resp.maxRisk
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

  loadOpenBets(){
    if(this.decodedToken.role !== 'Client')
    {
      return;
    }

    this.dataService.getBets(1,5000,this.decodedToken.id,'','','','','','','','',false,'','UNSETTLED','','').subscribe(resp =>{
      this.betSlipService.currentOpenBets = resp.body.items.filter((x:any)=> x.status == 'UNMATCHED' ||  x.status == 'PENDING'||  x.status == 'PARTIALLY_MATCHED')
      this.betSlipService.updateOpenBetsOptions();
    },
    error =>{

    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }




  

  getRate() {
    // return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=2e90850ca4ad4739b4116e11756c4336`, {
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=15c3adca133a4ec8b0628394fd6cc4b3`, {
      observe: 'response',
    });
  }

  updateCurrency(){
    this.getRate().subscribe((resp:any) =>{
      // rate of pound compared to usd [usd is the base for exchange + GBP is base for the datafeed] 
      // let E = resp.body.rates.EUR;
      let poundRate = resp.body.rates.GBP;
      let usedCurrencyRate = resp.body.rates[this.currentUserInfo.currency];
      // let T = resp.body.rates.TRY;
  
      let poundToUsedRate = usedCurrencyRate/poundRate;
      let TtoE = poundRate/usedCurrencyRate;
      this.sharedService.currencyData.rate = poundToUsedRate;
    })
  }


  subject = new Subject();
  timerStart(){
    timer(1000, 1000).pipe(
      takeUntil(this.subject),
      ).subscribe(t => 
      { 
        //every 1 hours (60sec * 60min)
        if(t == (60*60)){
          this.updateCurrency();
          this.timerStop();
        }
      });
    }
    timerStop(startAgain = true){
      this.subject.next();
      this.timerStart();
    }

}
