import API from "@/lib/axios"

export const submitContactForm = async (payload: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}) => {
    const { data } = await API.post("/v1/marketing/contact", payload);
    return data;
};

export const submitReport = async (payload: {
    category: string;
    description: string;
    email?: string;
    bookingId?: string;
}) => {
    const { data } = await API.post("/v1/marketing/report", payload);
    return data;
};
