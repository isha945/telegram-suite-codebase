export type NotificationType = 
  | 'transaction' 
  | 'price-alert' 
  | 'whale-alert'
  | 'nft-activity'
  | 'defi-position'
  | 'governance'
  | 'contract-event'
  | 'custom';

export interface NotificationPayload {
  type: NotificationType;
  data: any;
}