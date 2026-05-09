export interface IUser {
  _id: string;
  consumerPhone?: string;
  providerPhone?: string;
  consumerEmail?: string;
  providerEmail?: string;
  isConsumerEmailVerified: boolean;
  isProviderEmailVerified: boolean;
  activeRoles: string[];
  pushTokens?: string[];
  consumerPushTokens?: string[];
  providerPushTokens?: string[];
  createdAt?: string;
  updatedAt?: string;
  isAdminVerified?: boolean;
  consumerId?: string | null;
  providerId?: string | null;
}

export interface UserFilters {
  role?: string;
  verified?: string;
}

export interface UsersResponse {
  data: IUser[];
  message?: string;
}