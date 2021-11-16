import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type LogoutResponseType = {
    info: string
    error?: string
}
// type LoginResponseType = {
//     _id: string
//     email: string
//     name: string
//     avatar?: string
//     publicCardPacksCount: number
//     created: Date | null
//     updated: Date | null
//     isAdmin: boolean
//     verified: boolean
//     rememberMe: boolean
//     error?: string
//     deviceTokens: any
//     token: string
//     __v: number
//
// }


export const loginApi = {
    login(data: LoginParamsType) {
        return instance.post('auth/login', data)
    },
    me() {
        return instance.post('auth/me')
    },
    logout() {
        return instance.delete<AxiosResponse<LogoutResponseType>>('auth/me')
    }
}