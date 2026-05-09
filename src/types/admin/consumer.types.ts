export interface IConsumerAddress {
  _id?: string;
  label: string;
  formattedAddress: string;
  location: {
    type?: string;
    coordinates?: number[];
    city?: string;
    state?: string;
    country?: string;
  };
  isDefault: boolean;
}

export interface IConsumerVerification {
  idUri?: string;
  selfieUri?: string;
}

export interface IConsumer {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture?: string;
  isVerified: boolean;
  pushTokens?: string[];
  createdAt?: string;
  updatedAt?: string;
  consumerEmail?: string;
  consumerPhone?: string;
  isConsumerEmailVerified?: boolean;
  addresses?: IConsumerAddress[];
  verification?: IConsumerVerification;
  verificationStatus?: 'pending' | 'verified' | 'rejected';
}

export interface ConsumerWithUser extends IConsumer {
  user?: {
    email: string;
    phone: string;
    isEmailVerified: boolean;
    createdAt: string;
  };
}

export interface ConsumerFilters {
  role?: string;
  verified?: string;
}

export interface ConsumerPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ConsumersResponse {
  data: IConsumer[];
  pagination: ConsumerPagination;
}