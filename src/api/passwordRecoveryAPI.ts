import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
});

type RecoveryResponseType = {
    info: string
    error?: string
}

export const passwordRecoveryAPI = {
    passRecovery(email: string, message: () => JSX.Element) {
        return instance.post<RecoveryResponseType>('auth/forgot', {email, message});
    },
    inputNewPass(password: string, resetPasswordToken: string | undefined) {
        return instance.post<RecoveryResponseType>('auth/set-new-password', {password, resetPasswordToken})
    }
}