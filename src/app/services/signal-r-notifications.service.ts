import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';



const notificationsEndpoint = environment.notificationsEndpoint;

export type NotificationType = "ACCOUNT_SUSPENDED" | "BET_MATCHED";
export interface NotificationPayload {
    type: NotificationType;
    message: string;
    payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class SignalRNotificationsService {
	private _connection: any;
	// private _connection: HubConnection;

  recivedNotification = new BehaviorSubject<any>(null);
  notification = this.recivedNotification.asObservable();

  
  recivedBetUpdate = new BehaviorSubject<any>(null);
  betUpdate = this.recivedBetUpdate.asObservable();
  

	constructor(public router: Router) {
   this._connection = null;

   if(localStorage.getItem('token')){
      this.connectToNotificationsHub();
    }
	}

  delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
  }

  connectToNotificationsHub(){
    let token:any = localStorage.getItem('token');
     
		this._connection = new HubConnectionBuilder()
			.withUrl(notificationsEndpoint + `?access_token=Bearer ${token}`, {
				// withCredentials: true,
        // accessTokenFactory: () => token,
        // skipNegotiation: true
        logMessageContent: true
			})
			.withAutomaticReconnect()
			.build();

		this._connection
			.start()
			.then(() => {
        console.log("SignalR Notifications connected");
        if(this.router.url !== '/login')
        {
          this.startNotificationListen();
          this._connection.invoke("GetMyId")
            .then((id:any) => {/*console.log("My ID from invokation is " + id)*/})
            .catch(console.error);
        }
      })
      .catch((err:any) => {
         console.log("SIGMA", err)})
      
  }

  private onNotificationReceive(noti:NotificationPayload) {

    console.log(`Recieved a notofication`);
    this.recivedNotification.next(noti);
  }

  
  private onBetUpdateReceive(noti:NotificationPayload) {
    this.recivedBetUpdate.next(noti);
  }

	startNotificationListen(){

    console.log('noti on')
		this._connection.on("onNotification", this.onNotificationReceive.bind(this));
		this._connection.on("onBetUpdate", this.onBetUpdateReceive.bind(this));
	}
	
	stopNotificationListen(){

    console.log('noti off')
		this._connection.off("Notification");
		this._connection.off("onBetUpdate");
	}


  // onBetUpdate
  // >>> bet info + id 



}
