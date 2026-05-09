import { setCookie, parseCookies, destroyCookie } from 'nookies'

export const setAuthToken = (token: string) => {
    setCookie(null, 'token', token, { path: '/', maxAge: 60 * 60 * 24 * 7 });
};

export const getAuthToken = () => {
    const cookies = parseCookies();
    return cookies.token;
};

export const removeAuthToken = () => {
    destroyCookie(null, 'token');
};
