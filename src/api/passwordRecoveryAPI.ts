import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const passwordRecoveryAPI = {
    passRecovery(email: string, message: () => any) {
        return instance.post<RecoveryResponseType>('auth/forgot', {email, message});
    },
    inputNewPass(password: string, resetPasswordToken: string) {
        return instance.post<RecoveryResponseType>('auth/set-new-password', {password, resetPasswordToken})
    }
}

type RecoveryResponseType = {
    info: string
    error?: string
}