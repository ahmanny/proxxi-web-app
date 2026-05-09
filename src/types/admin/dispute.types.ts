export type DisputeResolution = 
  | 'pending' 
  | 'resolved' 
  | 'rejected' 
  | 'refunded';

export type DisputeStatus = 
  | 'open' 
  | 'under-review' 
  | 'resolved' 
  | 'closed';

export interface IDispute {
  _id: string;
  bookingId: string;
  consumerId: string;
  providerId: string;
  raisedBy: 'customer' | 'provider';
  reason: string;
  description: string;
  status: DisputeStatus;
  resolution?: DisputeResolution;
  resolutionNote?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DisputesResponse {
  data: IDispute[];
  message?: string;
}

export interface DisputeFilters {
  status?: string;
  resolution?: string;
}