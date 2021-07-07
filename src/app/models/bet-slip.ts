export interface BetSlip {
  eventName: string;
  eventId: string;
  isBack: boolean;
  stake?:number;
  liability:number;
  market: {
    marketName: string;
    marketId: string;
    run: {
      runnerName: string;
      price: number;
      size: number;
      selectionId: string;
    };
  };
}
