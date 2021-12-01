import { Inject, Injectable, Injector } from '@angular/core';
import { HubConnectionBuilder, HubConnection, HubConnectionState } from "@microsoft/signalr";
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';
import { LayoutService } from './layout.service';



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
	liveFeedStarted = false;
  
  eventDetail = new BehaviorSubject<any>(null);
  selectedEventDetail = this.eventDetail.asObservable();


	constructor(@Inject(Injector) private injector: Injector, private layoutService:LayoutService) {
		this._connection = null;
		// this.connectToLiveFeed();
		// use the below if the connection is authorized, with working on it from authServices and so on
		if(localStorage.getItem('token')){
			this.connectToLiveFeed();
		}
	}
  
	private get dataService(): DataService {
		return this.injector.get(DataService);
	  }

	connectToLiveFeed(reConnectCall = false){
		// if(reConnectCall){
		// 	console.log('---------------- i try connect one min plz')
		// }
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
			.then(async () => {
		this._connection.invoke("AssignToGroup", "live-update"); 
		console.log("SignalR connected");

		if(reConnectCall){
			await this.delay(1000);
			let eventId = null;
          if(this._currentGroup){
            eventId = this._currentGroup.split('-')[1].trim();
          }
	// console.log('------------ i listen event ', eventId)

          this.listenToEvent(eventId);

		  if(this.layoutService.getHeaderValue() == 'live'){
				// console.log('------------- i in live')
			  this.startLiveUpdate();
			  this.dataService.loadLiveGames(true);
		  }
		  
		}
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

	public async listenToEvent(eventId: string | number | null) {

		if(this._connection.state !== HubConnectionState.Connected || !eventId){
			return;
		}

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
		this._currentGroup = undefined;
	}

	public onLiveUpdate(games: any) {
		this.liveFeedCounter++;
		console.log(`Recieved information for ${games.length} games`);
    	this.events.next(games);
  }
	
	private onLiveGameUpdate(game: Match) {
		debugger

		console.log(`Recieved information for one game`);
	    this.eventDetail.next(game);
  }

	startLiveUpdate(){
		this.liveFeedStarted = true;
		this.timer2Start();
		try{
			this.stopLiveUpdate();
		}
		catch(ex){

		}
		this._connection.on("liveUpdate", this.onLiveUpdate.bind(this));
	}
	
	stopLiveUpdate(){
		this.timer2Stop();
		this._connection.off("liveUpdate");
	}



	source: any;
	abc: any;
  timer1Start(){
  this.source = timer(1000, 1000);
  this.abc = this.source.subscribe((val:any) => {
      console.log(val);
    //   this.subscribeTimer = this.timeLeft - val;
	if(val == 50){
		this.timer1Stop();
		this.checkFeedConnection();
	}
    });
  }

  timer1Stop(){
	this.abc.unsubscribe();
	this.timer1Start();
  }


  subject = new Subject();
  timer2Start(){
	timer(1000, 1000).pipe(
		takeUntil(this.subject),
	  ).subscribe(t => 
		{
			if(t % 5 == 0){
				console.log(t);
			}
			
			if((t+1) % 30 == 0){
				this.timer2Stop();
				this.checkFeedConnection();
			}
		});
  }

  timer2Stop(){
	this.subject.next();
	this.timer2Start();
  }



  liveFeedCounter=0;
  checkFeedConnection(){
	// console.log('---------- i check now')
    // console.log('feed # -> '+this.liveFeedCounter)
    if(this.liveFeedCounter == 0 && this.liveFeedStarted){
		// console.log('----------- not good')

    //   this.liveFeedTimer = 120 * 2;

      let hh = this._connection.state;
      let hhh = document.visibilityState;

      // this.removeEventListen(true);
	  this.stopLiveUpdate();
      this._connection.stop()

	  this.connectToLiveFeed(true);

    }

    this.liveFeedCounter = 0;
  }
}
