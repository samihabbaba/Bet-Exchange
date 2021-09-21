import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';



const signalrEndpoint = environment.signalrEndpoint;

type Match = Record<string, unknown>;
type GroupActionResult = { IsAddedToGroup: boolean; ErrorMessages: string[] };

@Injectable({
  providedIn: 'root'
})
export class LiveFeedService {
	// private _connection: HubConnection;
	private _connection: any;
	private _currentGroup?: string;
  
  events = new BehaviorSubject<any>(null);
  selectedEvents = this.events.asObservable();

  
  eventDetail = new BehaviorSubject<any>(null);
  selectedEventDetail = this.eventDetail.asObservable();


	constructor() {
		this._connection = null;
		// this.connectToLiveFeed();
		// use the below if the connection is authorized, with working on it from authServices and so on
debugger
		if(localStorage.getItem('token')){
			this.connectToLiveFeed();
		}
	}
  
	connectToLiveFeed(){

			this._connection = new HubConnectionBuilder()
			.withUrl(signalrEndpoint, {
				withCredentials: true,
				// headers: { authorization: "39e7311b3a0a4b25882a4811afed53fc" },
				headers: { authorization: environment.apiKey },
			})
			.withAutomaticReconnect()
			.build();
		this._connection
			.start()
			.then(() => {
		this._connection.invoke("AssignToGroup", "live-update"); 
		console.log("SignalR connected");
	})
	.catch((err:any) => { console.log("SIGMA", err)})
		// this._connection.on("liveUpdate", this.onLiveUpdate.bind(this));
		this._connection.on("liveGameUpdate", this.onLiveGameUpdate.bind(this));


		// this._connection.onclose(() => { 

		//   this.reconnect();

		// });

	}

  async reconnect(){
    await this.delay(3000);
        this._connection.start().then(() => {
          this._connection.invoke("AssignToGroup", "live-update"); 
          console.log("SignalR connected");
        
          // if signle game data not coming --> assign (invoke again)
          // this._connection.on("liveUpdate", this.onLiveUpdate.bind(this));
          // this._connection.on("liveGameUpdate", this.onLiveGameUpdate.bind(this));
        })
    }


  delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
  }

	public async listenToEvent(eventId: string | number) {
		const newGroup = `event-${eventId}-update`;
		if (this._currentGroup)
			await this._connection.invoke("RemoveFromGroup", this._currentGroup);
		const result: GroupActionResult = await this._connection.invoke(
			"AssignToGroup",
			newGroup
		);
		this._currentGroup = newGroup;
	}

	removeEventListen(){
		if (this._currentGroup)
			{
				this._connection.invoke("RemoveFromGroup", this._currentGroup);
				this._currentGroup = undefined;
			}
	}

	public onLiveUpdate(games: any) {
		// debugger
		
		console.log(`Recieved information for ${games.length} games`);
    	this.events.next(games);
  }
	
	private onLiveGameUpdate(game: Match) {
		console.log(`Recieved information for one game`);
	    this.eventDetail.next(game);
  }

	startLiveUpdate(){
		try{
			this.stopLiveUpdate();
		}
		catch(ex){

		}
		this._connection.on("liveUpdate", this.onLiveUpdate.bind(this));
	}
	
	stopLiveUpdate(){
		this._connection.off("liveUpdate");
	}
}
