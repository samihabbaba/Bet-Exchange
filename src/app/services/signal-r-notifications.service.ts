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
	private _connection: HubConnection;

  recivedNotification = new BehaviorSubject<any>(null);
  notification = this.recivedNotification.asObservable();


	constructor(public router: Router) {
		this._connection = new HubConnectionBuilder()
			.withUrl(notificationsEndpoint, {
				withCredentials: true,
				headers: { authorization: environment.apiKey },
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
        }
      })
      .catch((err) => { console.log("SIGMA", err)})
      
	}

  delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
  }


  private onNotificationReceive(noti:NotificationPayload) {
    debugger
		console.log(`Recieved a notofication`);
    this.recivedNotification.next(noti);
  }

	startNotificationListen(){

    console.log('noti on')
		this._connection.on("Notification", this.onNotificationReceive.bind(this));
	}
	
	stopNotificationListen(){

    console.log('noti off')
		this._connection.off("Notification");
	}

}
