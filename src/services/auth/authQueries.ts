import { useMutation } from "@tanstack/react-query";
import { fogottenPassword, googleLogin, loginAdmin, loginUser, logoutUser, registerUser, resetPassword } from "./authServices";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useUserStore } from "@/store/UserStore";
import { logout } from "@/lib/utils/logout.utils";


// user sign up
export const useSignupUser = () => {
    const userStore = useUserStore.getState();

    return useMutation({
        mutationFn: registerUser,
        onSuccess: async (data) => {
            // save the access token 
            setCookie(null, "access-token", data.tokens.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
                secure: process.env.NODE_ENV === "production",
            });
            setCookie(null, "refresh-token", data.tokens.refresh_token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
            setCookie(null, "user-role", data.user.role, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            userStore.login(data.user, true)
        }
    })
}

// user Login 
export const useLoginUser = () => {
    const userStore = useUserStore(); // Zustand — safe

    return useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            try {
                setCookie(null, "access-token", data.tokens.access_token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                });

                setCookie(null, "refresh-token", data.tokens.refresh_token, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                });

                setCookie(null, "user-role", data.user.role, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });

                userStore.login(data.user, true);

                return true; // indicate success
            } catch (err) {
                console.error("Error during post-login tasks:", err);
                throw err;
            }
        },
    });

};

// google Login 
export const useGoogleAuth = () => {
    const userStore = useUserStore(); // Zustand — safe

    return useMutation({
        mutationFn: googleLogin,
        onSuccess: async (data) => {
            try {
                setCookie(null, "access-token", data.tokens.access_token, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                });

                setCookie(null, "refresh-token", data.tokens.refresh_token, {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                });

                setCookie(null, "user-role", data.user.role, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });

                userStore.login(data.user, true);

                return true; // indicate success
            } catch (err) {
                console.error("Error during post-login tasks:", err);
                throw err;
            }
        },
    });

};



// admin Login 
export const useLoginAdmin = () => {
    const userStore = useUserStore.getState();

    return useMutation({
        mutationFn: loginAdmin,
        onSuccess: (response) => {
            const { tokens, user } = response.data;

            // save the access token 
            setCookie(null, "access-token", tokens.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
                secure: process.env.NODE_ENV === "production",
            });
            setCookie(null, "refresh-token", tokens.refresh_token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
            // Set user-role to 'admin' for middleware protection - maps all admin roles (super-admin, support, finance) to 'admin'
            setCookie(null, "user-role", "admin", {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
            });
            // Store the specific admin role for UI purposes
            if (user.role) {
                setCookie(null, "admin-role", user.role, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                });
            }
            // Map backend 'role' to 'adminRole' for frontend store
            const userWithAdminRole = {
                ...user,
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Admin",
                adminRole: user.role
            };
            userStore.login(userWithAdminRole, true)
        }
    })
}


// forgotten password 
export const useFogottenPassword = () => {
    return useMutation({
        mutationFn: fogottenPassword,
        onSuccess: () => {
        }
    })
}

// reset password hook
export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
        }
    })
}



// log out user
export const useLogoutUser = () => {
    return useMutation({
        mutationFn: async () => {
            const cookies = parseCookies();
            const refresh_token = cookies["refresh-token"];

            if (!refresh_token) {
                throw new Error("Refresh token not found");
            }

            return await logoutUser({ refresh_token });
        },
        onSuccess: async () => {
            await logout()
        }
    })
}

// log out admin
export const useLogoutAdmin = () => {
    return useMutation({
        mutationFn: async () => {
            const cookies = parseCookies();
            const refresh_token = cookies["refresh-token"];

            if (!refresh_token) {
                throw new Error("Refresh token not found");
            }

            return await logoutUser({ refresh_token });
        },
        onSuccess: async () => {
            await logout()
        }
    })
}