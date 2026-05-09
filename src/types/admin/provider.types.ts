export interface IService {
  name: string;
  value: string;
  price: number;
}

export interface IProviderShopAddress {
  address: string;
  city?: string;
  state?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
}

export interface IAvailabilityDay {
  dayOfWeek: number;
  slots: { start: string; end: string }[];
  isClosed: boolean;
}

export interface IPayoutDetails {
  bankCode: string;
  bankName: string;
  bankSlug: string;
  accountNumber: string;
  accountName: string;
  verifiedAt?: string;
}

export interface IVerification {
  idUri?: string;
  selfieUri?: string;
}

export interface IServiceArea {
  address: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  radiusKm: number;
}

export type ProfileStatus = 'pending' | 'approved' | 'rejected';
export type AvailabilityMode = 'instant' | 'scheduled';

export interface IProvider {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  profilePicture?: string;
  bio?: string;
  isAvailable: boolean;
  availabilityMode: AvailabilityMode;
  serviceType: string;
  basePriceFrom: number;
  services: IService[];
  homeServiceAvailable: boolean;
  offersShopVisit: boolean;
  serviceArea?: IServiceArea;
  rating: number;
  totalStars: number;
  reviewCount: number;
  weightedRating: number;
  status: ProfileStatus;
  verification?: IVerification;
  avgServiceTime: number;
  shopAddress?: IProviderShopAddress;
  availability?: IAvailabilityDay[];
  payoutDetails?: IPayoutDetails;
  paystackRecipientCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProviderFilters {
  status?: string;
  serviceType?: string;
}

export interface ProvidersResponse {
  data: IProvider[];
  message?: string;
}

export interface ProviderResponse {
  data: IProvider;
  message?: string;
}