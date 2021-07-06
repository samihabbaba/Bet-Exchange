export interface BetSlip {
  eventName: string;
  eventId: string;

  market: {
    marketName: string;
    marketId: string;
    run: {
      price: number;
      size: number;
      selectionId: string;
    };
  };
}
