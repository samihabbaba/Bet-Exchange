export interface MasterUser {
  id: string;
  account: string;
  availableBalance: number;
  exposure: number;
  subAccountBalance: number;
  subAccountBalanceWithExposure: number;
  totalBalance: number;
  status: string;
  actions: any;
}
