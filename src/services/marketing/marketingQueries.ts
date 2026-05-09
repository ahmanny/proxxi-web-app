import { useMutation } from "@tanstack/react-query";
import { submitContactForm, submitReport } from "./marketingServices";

export const useSubmitContact = () => {
    return useMutation({
        mutationFn: submitContactForm,
    });
};

export const useSubmitReport = () => {
    return useMutation({
        mutationFn: submitReport,
    });
};
