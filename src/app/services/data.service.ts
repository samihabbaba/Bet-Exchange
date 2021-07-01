import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  baseUrl = environment.apiUrl;
  events:any = [];

  constructor(private http: HttpClient) {

    this.events = [
      {
         "event":{
            "key":"EVENT:30656155",
            "eventId":30656155,
            "name":"Slovan Liberec v Usti nad Labem",
            "timezone":"GMT",
            "videoAvailable":false,
            "countryCode":null,
            "eventTypeId":1,
            "leagueId":12005859,
            "openDate":"2021-06-30T08:59:46Z"
         },
         "updatedAt":"2021-06-30T10:11:38",
         "marketsUpdatedAt":"2021-06-30T10:20:01",
         "timelineUpdatedAt":"2021-06-30T10:19:58",
         "markets":[
            {
               "marketId":"1.184892398",
               "isMarketDataDelayed":false,
               "state":{
                  "totalAvailable":30598.175370234,
                  "numberOfRunners":3,
                  "status":"OPEN",
                  "runnersVoidable":false,
                  "totalMatched":25385.5030729148,
                  "inPlay":true,
                  "betDelay":5,
                  "version":3893337424,
                  "numberOfActiveRunners":3,
                  "complete":true,
                  "numberOfWinners":1,
                  "lastMatchTime":"2021-06-30T10:18:30.615Z",
                  "crossMatching":true,
                  "bspReconciled":false
               },
               "isMarketDataVirtual":true,
               "runners":[
                  {
                     "selectionId":10503,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":1.02,
                        "sortPriority":1
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":1.01,
                              "size":18372.56
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":1.03,
                              "size":347.48
                           },
                           {
                              "price":1.04,
                              "size":323.96
                           },
                           {
                              "price":1.05,
                              "size":1047
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"Slovan Liberec"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":6081319,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":510,
                        "sortPriority":2
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":11.5,
                              "size":27.23
                           },
                           {
                              "price":5.5,
                              "size":36.67
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":1000,
                              "size":3.74
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"Usti Nad Labem"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":58805,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":50,
                        "sortPriority":3
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":26,
                              "size":41.07
                           },
                           {
                              "price":21,
                              "size":36.05
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":80,
                              "size":33.48
                           },
                           {
                              "price":110,
                              "size":57.61
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"The Draw"
                     },
                     "handicap":0
                  }
               ],
               "description":{
                  "bettingType":"ODDS",
                  "marketType":"MATCH_ODDS",
                  "suspendTime":"2021-06-30T08:59:46Z",
                  "bspMarket":false,
                  "marketName":"Match Odds",
                  "marketTime":"2021-06-30T08:59:46Z",
                  "persistenceEnabled":true,
                  "turnInPlayEnabled":true,
                  "priceLadderDescription":{
                     "type":"CLASSIC"
                  }
               },
               "market":{
                  "totalAvailable":24651,
                  "totalMatched":17413.27,
                  "associatedMarkets":[
                     {
                        "eventTypeId":1,
                        "sportsbookMarketId":"924.268813429",
                        "eventId":30656155
                     }
                  ],
                  "key":"MARKET:1.184892398",
                  "eventId":30656155,
                  "upperLevelEventId":28826752,
                  "numberOfUpperLevels":1,
                  "productType":"EXCHANGE",
                  "canTurnInPlay":true,
                  "marketLevels":[
                     "AVB_EVENT"
                  ],
                  "marketType":"MATCH_ODDS",
                  "numberOfWinners":1,
                  "marketName":"Match Odds",
                  "numberOfRunners":3,
                  "marketTime":"2021-06-30T08:59:46Z",
                  "eventTypeId":1,
                  "marketId":"1.184892398",
                  "marketStatus":"OPEN",
                  "inplay":true,
                  "numberOfActiveRunners":3,
                  "topLevelEventId":28826752
               }
            }
         ],
         "timeline":{
            "elapsedRegularTime":73,
            "eventTypeId":1,
            "status":"IN_PLAY",
            "updateDetails":[
               {
                  "updateId":5,
                  "teamName":null,
                  "type":"KickOff",
                  "updateTime":"2021-06-30T08:59:46.187Z",
                  "matchTime":1,
                  "updateType":"KickOff",
                  "elapsedRegularTime":1,
                  "team":null
               },
               {
                  "updateId":35,
                  "teamName":"away",
                  "type":"Goal",
                  "updateTime":"2021-06-30T09:20:37.779Z",
                  "matchTime":21,
                  "updateType":"Goal",
                  "elapsedRegularTime":21,
                  "team":"away"
               },
               {
                  "updateId":42,
                  "teamName":"home",
                  "type":"Goal",
                  "updateTime":"2021-06-30T09:29:19.039Z",
                  "matchTime":30,
                  "updateType":"Goal",
                  "elapsedRegularTime":30,
                  "team":"home"
               },
               {
                  "updateId":43,
                  "teamName":"home",
                  "type":"Goal",
                  "updateTime":"2021-06-30T09:30:35.156Z",
                  "matchTime":31,
                  "updateType":"Goal",
                  "elapsedRegularTime":31,
                  "team":"home"
               },
               {
                  "updateId":61,
                  "teamName":null,
                  "type":"FirstHalfEnd",
                  "updateTime":"2021-06-30T09:44:52.952Z",
                  "matchTime":46,
                  "updateType":"FirstHalfEnd",
                  "elapsedRegularTime":45,
                  "team":null
               },
               {
                  "updateId":64,
                  "teamName":null,
                  "type":"SecondHalfKickOff",
                  "updateTime":"2021-06-30T09:51:02.875Z",
                  "matchTime":46,
                  "updateType":"SecondHalfKickOff",
                  "elapsedRegularTime":46,
                  "team":null
               },
               {
                  "updateId":68,
                  "teamName":"home",
                  "type":"Goal",
                  "updateTime":"2021-06-30T09:52:49.722Z",
                  "matchTime":47,
                  "updateType":"Goal",
                  "elapsedRegularTime":47,
                  "team":"home"
               }
            ],
            "score":{
               "home":{
                  "numberOfCornersSecondHalf":1,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"2",
                  "numberOfCorners":2,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":1,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"3",
                  "highlight":false,
                  "name":"Home"
               },
               "away":{
                  "numberOfCornersSecondHalf":1,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"1",
                  "numberOfCorners":2,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":1,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"1",
                  "highlight":false,
                  "name":"Away"
               },
               "numberOfCorners":4,
               "numberOfRedCards":0,
               "numberOfCornersFirstHalf":2,
               "numberOfCards":0,
               "bookingPoints":0,
               "numberOfYellowCards":0,
               "numberOfCornersSecondHalf":2
            },
            "eventId":30656155,
            "inPlayMatchStatus":"SecondHalfKickOff",
            "timeElapsed":73
         },
         "isDisabled":false
      },
      {
         "event":{
            "key":"EVENT:30656154",
            "eventId":30656154,
            "name":"Bohemians 1905 v FC Sellier & Bellot Vlasim",
            "timezone":"GMT",
            "videoAvailable":false,
            "countryCode":null,
            "eventTypeId":1,
            "leagueId":12005859,
            "openDate":"2021-06-30T09:02:14Z"
         },
         "updatedAt":"2021-06-30T10:08:44",
         "marketsUpdatedAt":"2021-06-30T10:20:00",
         "timelineUpdatedAt":"2021-06-30T10:19:59",
         "markets":[
            {
               "marketId":"1.184892483",
               "isMarketDataDelayed":false,
               "state":{
                  "totalAvailable":38787.9743620201,
                  "numberOfRunners":3,
                  "status":"OPEN",
                  "runnersVoidable":false,
                  "totalMatched":31726.9273073231,
                  "inPlay":true,
                  "betDelay":5,
                  "version":3893381979,
                  "numberOfActiveRunners":3,
                  "complete":true,
                  "numberOfWinners":1,
                  "lastMatchTime":"2021-06-30T10:18:19.929Z",
                  "crossMatching":true,
                  "bspReconciled":false
               },
               "isMarketDataVirtual":true,
               "runners":[
                  {
                     "selectionId":2467701,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":50,
                        "sortPriority":1
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":36,
                              "size":33.11
                           },
                           {
                              "price":34,
                              "size":15.37
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":70,
                              "size":32.03
                           },
                           {
                              "price":110,
                              "size":41.7
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"Bohemians 1905"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":21285670,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":1.13,
                        "sortPriority":2
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":1.12,
                              "size":523.15
                           },
                           {
                              "price":1.11,
                              "size":1251.81
                           },
                           {
                              "price":1.1,
                              "size":1800.87
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":1.14,
                              "size":1752.49
                           },
                           {
                              "price":1.15,
                              "size":1502.12
                           },
                           {
                              "price":1.16,
                              "size":1009.43
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"FC Sellier & Bellot Vlasim"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":58805,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":9.4,
                        "sortPriority":3
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":10.5,
                              "size":67.42
                           },
                           {
                              "price":10,
                              "size":45.02
                           },
                           {
                              "price":9.8,
                              "size":38.52
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":12,
                              "size":101.59
                           },
                           {
                              "price":12.5,
                              "size":47
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"The Draw"
                     },
                     "handicap":0
                  }
               ],
               "description":{
                  "bettingType":"ODDS",
                  "marketType":"MATCH_ODDS",
                  "suspendTime":"2021-06-30T09:02:14Z",
                  "bspMarket":false,
                  "marketName":"Match Odds",
                  "marketTime":"2021-06-30T09:02:14Z",
                  "persistenceEnabled":true,
                  "turnInPlayEnabled":true,
                  "priceLadderDescription":{
                     "type":"CLASSIC"
                  }
               },
               "market":{
                  "totalAvailable":21830,
                  "totalMatched":18554.33,
                  "associatedMarkets":[
                     {
                        "eventTypeId":1,
                        "sportsbookMarketId":"924.268813418",
                        "eventId":30656154
                     }
                  ],
                  "key":"MARKET:1.184892483",
                  "eventId":30656154,
                  "upperLevelEventId":28826752,
                  "numberOfUpperLevels":1,
                  "productType":"EXCHANGE",
                  "canTurnInPlay":true,
                  "marketLevels":[
                     "AVB_EVENT"
                  ],
                  "marketType":"MATCH_ODDS",
                  "numberOfWinners":1,
                  "marketName":"Match Odds",
                  "numberOfRunners":3,
                  "marketTime":"2021-06-30T09:02:14Z",
                  "eventTypeId":1,
                  "marketId":"1.184892483",
                  "marketStatus":"OPEN",
                  "inplay":true,
                  "numberOfActiveRunners":3,
                  "topLevelEventId":28826752
               }
            }
         ],
         "timeline":{
            "elapsedRegularTime":73,
            "eventTypeId":1,
            "status":"SecondHalfKickOff",
            "updateDetails":null,
            "score":{
               "home":{
                  "numberOfCornersSecondHalf":3,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"2",
                  "numberOfCorners":6,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":3,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"2",
                  "highlight":false,
                  "name":"Bohemians 1905"
               },
               "away":{
                  "numberOfCornersSecondHalf":0,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"3",
                  "numberOfCorners":2,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":2,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"4",
                  "highlight":false,
                  "name":"FC Sellier & Bellot Vlasim"
               },
               "numberOfCorners":8,
               "numberOfRedCards":0,
               "numberOfCornersFirstHalf":5,
               "numberOfCards":0,
               "bookingPoints":0,
               "numberOfYellowCards":0,
               "numberOfCornersSecondHalf":3
            },
            "eventId":30656154,
            "inPlayMatchStatus":null,
            "timeElapsed":73
         },
         "isDisabled":false
      },
      {
         "event":{
            "key":"EVENT:30656837",
            "eventId":30656837,
            "name":"C-Osaka v Port FC",
            "timezone":"GMT",
            "videoAvailable":false,
            "countryCode":null,
            "eventTypeId":1,
            "leagueId":39218,
            "openDate":"2021-06-30T10:00:00Z"
         },
         "updatedAt":"2021-06-30T09:53:21",
         "marketsUpdatedAt":"2021-06-30T10:20:02",
         "timelineUpdatedAt":"2021-06-30T10:20:01",
         "markets":[
            {
               "marketId":"1.184892849",
               "isMarketDataDelayed":false,
               "state":{
                  "totalAvailable":37012.6141023302,
                  "numberOfRunners":3,
                  "status":"OPEN",
                  "runnersVoidable":false,
                  "totalMatched":90552.0894785379,
                  "inPlay":true,
                  "betDelay":9,
                  "version":3893376505,
                  "numberOfActiveRunners":3,
                  "complete":true,
                  "numberOfWinners":1,
                  "lastMatchTime":"2021-06-30T10:17:42.155Z",
                  "crossMatching":true,
                  "bspReconciled":false
               },
               "isMarketDataVirtual":true,
               "runners":[
                  {
                     "selectionId":361742,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":1.99,
                        "sortPriority":1
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":1.96,
                              "size":140.61
                           },
                           {
                              "price":1.95,
                              "size":464
                           },
                           {
                              "price":1.93,
                              "size":434.08
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":2.04,
                              "size":113.49
                           },
                           {
                              "price":2.06,
                              "size":533.49
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"C-Osaka"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":9255164,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":4.6,
                        "sortPriority":2
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":4.3,
                              "size":199.02
                           },
                           {
                              "price":4.2,
                              "size":47.89
                           },
                           {
                              "price":4.1,
                              "size":151.02
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":4.6,
                              "size":35.56
                           },
                           {
                              "price":4.7,
                              "size":474.8
                           },
                           {
                              "price":4.8,
                              "size":11.06
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"Port FC"
                     },
                     "handicap":0
                  },
                  {
                     "selectionId":58805,
                     "state":{
                        "totalMatched":0,
                        "status":"ACTIVE",
                        "lastPriceTraded":3.6,
                        "sortPriority":3
                     },
                     "exchange":{
                        "availableToBack":[
                           {
                              "price":3.55,
                              "size":54.45
                           },
                           {
                              "price":3.45,
                              "size":277.47
                           }
                        ],
                        "availableToLay":[
                           {
                              "price":3.65,
                              "size":36.14
                           },
                           {
                              "price":3.8,
                              "size":251.91
                           },
                           {
                              "price":3.85,
                              "size":26.55
                           }
                        ]
                     },
                     "description":{
                        "runnerName":"The Draw"
                     },
                     "handicap":0
                  }
               ],
               "description":{
                  "bettingType":"ODDS",
                  "marketType":"MATCH_ODDS",
                  "suspendTime":"2021-06-30T10:00:16Z",
                  "bspMarket":false,
                  "marketName":"Match Odds",
                  "marketTime":"2021-06-30T10:00:16Z",
                  "persistenceEnabled":true,
                  "turnInPlayEnabled":true,
                  "priceLadderDescription":{
                     "type":"CLASSIC"
                  }
               },
               "market":{
                  "totalAvailable":36410,
                  "totalMatched":65824.45,
                  "associatedMarkets":[
                     {
                        "eventTypeId":1,
                        "sportsbookMarketId":"924.268832539",
                        "eventId":30656837
                     }
                  ],
                  "key":"MARKET:1.184892849",
                  "eventId":30656837,
                  "upperLevelEventId":15783124,
                  "numberOfUpperLevels":1,
                  "productType":"EXCHANGE",
                  "canTurnInPlay":true,
                  "marketLevels":[
                     "AVB_EVENT"
                  ],
                  "marketType":"MATCH_ODDS",
                  "numberOfWinners":1,
                  "marketName":"Match Odds",
                  "numberOfRunners":3,
                  "marketTime":"2021-06-30T10:00:00Z",
                  "eventTypeId":1,
                  "marketId":"1.184892849",
                  "marketStatus":"OPEN",
                  "inplay":false,
                  "numberOfActiveRunners":3,
                  "topLevelEventId":15783124
               }
            }
         ],
         "timeline":{
            "elapsedRegularTime":18,
            "eventTypeId":1,
            "status":"IN_PLAY",
            "updateDetails":[
               {
                  "updateId":7,
                  "teamName":null,
                  "type":"KickOff",
                  "updateTime":"2021-06-30T10:00:19.29Z",
                  "matchTime":1,
                  "updateType":"KickOff",
                  "elapsedRegularTime":1,
                  "team":null
               }
            ],
            "score":{
               "home":{
                  "numberOfCornersSecondHalf":0,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"",
                  "numberOfCorners":0,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":0,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"0",
                  "highlight":false,
                  "name":"Home"
               },
               "away":{
                  "numberOfCornersSecondHalf":0,
                  "penaltiesSequence":[
                     
                  ],
                  "halfTimeScore":"",
                  "numberOfCorners":1,
                  "penaltiesScore":"",
                  "numberOfRedCards":0,
                  "numberOfCornersFirstHalf":1,
                  "numberOfYellowCards":0,
                  "bookingPoints":0,
                  "sets":"",
                  "fullTimeScore":"",
                  "numberOfCards":0,
                  "games":"",
                  "score":"0",
                  "highlight":false,
                  "name":"Away"
               },
               "numberOfCorners":1,
               "numberOfRedCards":0,
               "numberOfCornersFirstHalf":1,
               "numberOfCards":0,
               "bookingPoints":0,
               "numberOfYellowCards":0,
               "numberOfCornersSecondHalf":0
            },
            "eventId":30656837,
            "inPlayMatchStatus":"KickOff",
            "timeElapsed":18
         },
         "isDisabled":false
      }
   ]
   
   }

  
  ////////////////////////////////
  ////// sports Controller //////
  ///////////////////////////////

  
  getSports(){
    return this.http.get<any>(`${this.baseUrl}sports`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
       });
  }


  /////////////////////////////////////
  ////// BettingRules Controller //////
  ////////////////////////////////////

  // GET​/bettingrules
  getBettingRules(pars:any){
    return this.http.get<any>(`${this.baseUrl}bettingrules?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
       });
  }

  // POST/bettingrules
  addBettingRules(obj:any) {
    return this.http.post(`${environment.apiUrl}bettingrules`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // GET/bettingrules​/{id}
  getBettingRulesById(id:any){
    return this.http.get<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // PUT/bettingrules​/{id}
  updateBettingRules(obj:any){
    return this.http.put<any>(`${this.baseUrl}bettingrules/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  // DELETE/bettingrules​/{id}
  deleteBettingRulesById(id:any){
    return this.http.delete<any>(`${this.baseUrl}bettingrules/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  ////////////////////////////////
  ////// League Controller //////
  ////////////////////////////////
  
  // GET​/leagues
  getLeagues​(pars:any){
    return this.http.get<any>(`${this.baseUrl}leagues​?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}&regionCode=${pars.regionCode?pars.regionCode:''}&SportId=${pars.SportId?pars.SportId:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
      });
  }

  // GET​/leagues
  getAllLeagues​(){
    return this.http.get<any>(`${this.baseUrl}leagues​/all`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
      });
  }

  getLeagueById(id:any){
    return this.http.get<any>(`${this.baseUrl}leagues​/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateLeague(obj:any){
    return this.http.put<any>(`${this.baseUrl}leagues​/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }



  //////////////////////////////
  ////// Live Controller //////
  /////////////////////////////

  getLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live?CountryCode=${pars.CountryCode?pars.CountryCode:''}&CompetitionId=${pars.CompetitionId?pars.CompetitionId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:''}&PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getAllLive​(pars:any){
    return this.http.get<any>(`${this.baseUrl}live?CountryCode=${pars.CountryCode?pars.CountryCode:''}&CompetitionId=${pars.CompetitionId?pars.CompetitionId:''}&IncludeDisabled=${pars.IncludeDisabled?pars.IncludeDisabled:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getLIveById(id:any){
    return this.http.get<any>(`${this.baseUrl}live/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }
 


  ////////////////////////////////
  ////// Region Controller //////
  ///////////////////////////////
  

  getRegions​(pars:any){
    return this.http.get<any>(`${this.baseUrl}regions?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}&SportId=${pars.SportId?pars.SportId:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getAllRegions​​(sportId:number){
    return this.http.get<any>(`${this.baseUrl}regions/all`,  {
      headers: this.httpOptions.headers,
      observe: 'response',
     });
  }

  getRegionById(id:any){
    return this.http.get<any>(`${this.baseUrl}regions/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }

  updateRegions(obj:any){
    return this.http.put<any>(`${this.baseUrl}regions/${obj.id}`, obj, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }


  //////////////////////////////////
  ////// Upcoming Controller //////
  ////////////////////////////////

  getUpcoming(pars:any){
    return this.http.get<any>(`${this.baseUrl}upcoming?PageNo=${pars.PageNo?pars.PageNo:''}&PageSize=${pars.PageSize?pars.PageSize:''}&SortBy=${pars.SortBy?pars.SortBy:''}&SortingType=${pars.SortingType?pars.SortingType:''}`,  {
      headers: this.httpOptions.headers,
      observe: 'response',    });
  }

  getAllUpcoming​​(){
    return this.http.get<any>(`${this.baseUrl}upcoming/all`,  {
      headers: this.httpOptions.headers,
      observe: 'response',    });
  }

  getUpcomingById(id:any){
    return this.http.get<any>(`${this.baseUrl}upcoming/${id}`, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
  }








  performLogIn(){
     debugger
     let loginURL = 'https://api.vebobet.com/';
     let model = {
      username : "DiscTest",
      password : "Disc123!"
     }

     this.login(model).subscribe(resp=>{
        debugger;
        const user:any = resp.body;

        localStorage.setItem("token", user.token);

     }, error=>{
        debugger
     })
}

login(model:any){
   let loginURL = 'https://api.vebobet.com/api/v1/auth/login';
   return this.http.post(loginURL, model, {
      headers: this.httpOptions.headers,
      observe: 'response',
    });
    
   this.http.post(loginURL, model).pipe(
      map((response: any) => {
        const user = response;
        debugger
        if (user.token) {
         //  this.decodedToken = this.jwtHelper.decodeToken(user.token);
         //  const role = this.decodedToken.role;
          
         
          localStorage.setItem("token", user.token);
         //  this.logInSuccess = true;

        }

        if (!user.success) {
         //  this.logInSuccess = false;
        }
      })
    );
}

}

