export interface PlayerUser {
  id: string;
  account: string;
  subAccountBalance: number;
  exposure: number;
  subAccountBalanceWithExposure: number;
  depositWithdraw: number;
  creditReference: number;
  status: string;
  actions: any;
}
