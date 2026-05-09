import API from "@/lib/axios"


// register user
export const registerUser = async (credential: { name: string, email: string, password: string }) => {
    const { data } = await API.post("/authentication/sign-up", credential);
    return data
}


// login user
export const loginUser = async (credential: { email: string, password: string }) => {
    const { data } = await API.post("/authentication/login", credential);
    return data
}
// login user
export const googleLogin = async (payload: { access_token: string }) => {
    const { data } = await API.post("/authentication/google", payload);
    return data
}

export const loginAdmin = async (credential: { email: string, password: string }) => {
    const { data } = await API.post("/auth/admin/login", credential);
    return data
}
// logout user
export const logoutUser = async ({ refresh_token }: { refresh_token: string }) => {
    const { data } = await API.post("/authentication/logout", { refresh_token });
    return data
}

// forgotten password
export const fogottenPassword = async (credential: { email: string }) => {
    const { data } = await API.post("/authentication/forgotten-password", credential);
    return data
}

// Reset Password
export const resetPassword = async (credential: { newPassword: string, token?: string }) => {
    const { data } = await API.post("/authentication/reset-password", credential)
    return data
}
