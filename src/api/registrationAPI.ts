import {instance} from "./instanceAPI";

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