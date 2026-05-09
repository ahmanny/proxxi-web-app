export type BookingStatus = 
  | 'pending' 
  | 'accepted' 
  | 'declined'
  | 'in_progress' 
  | 'completion_pending'
  | 'completed' 
  | 'disputed'
  | 'cancelled'
  | 'expired'
  | 'cancelled_refunded';

export type PaymentStatus = 
  | 'pending' 
  | 'authorized' 
  | 'held' 
  | 'released' 
  | 'failed' 
  | 'refunded';

export type PayoutStatus = 
  | 'pending' 
  | 'frozen'
  | 'available'
  | 'processing' 
  | 'completed';

export interface IPrice {
  total: number;
  platformFee: number;
  providerEarning: number;
}

export interface IBooking {
  _id: string;
  consumerId: string;
  providerId: string;
  service: string;
  serviceName: string;
  serviceType: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  payoutStatus: PayoutStatus;
  price: IPrice;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  consumerNote?: string;
  providerNote?: string;
  address?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingsResponse {
  data: IBooking[];
  message?: string;
}

export interface BookingFilters {
  status?: string;
  paymentStatus?: string;
  startDate?: string;
  endDate?: string;
}