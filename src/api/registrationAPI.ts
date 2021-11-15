import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const registrationAPI = {
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>('auth/register', {email, password});
    },
}

type RegisterResponseType = {
    addedUser: {}
    error?: string
}

// export type RegisterErrorType = {
//     emailRegExp: {}
//     error: string
//     in: string
//     isEmailValid: boolean
//     isPassValid: boolean
//     passwordRegExp: string
// }