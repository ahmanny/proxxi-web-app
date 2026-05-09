export interface AdminManagementICustomer {
    _id: number;
    name: string;
    phone?: string
    profilePicture?: string
    role?: string
    email: string;
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}