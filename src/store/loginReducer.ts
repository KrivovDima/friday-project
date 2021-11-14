import {Dispatch} from 'redux'
import {loginApi, LoginParamsType} from '../api/login-api';

type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date | null
    updated: Date | null
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
type InitialStateType = {
    isLoggedIn: boolean
    userData: UserDataType
}


const initialState: InitialStateType = {
    isLoggedIn: false,
    userData: {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: null,
        updated: null,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: '',
    }
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn, userData: {...action.payload.userData}};
        case 'SET-IS-LOGGED-OUT':
            return {...state, isLoggedIn: action.payload.isLoggedIn, userData: {...initialState.userData}};
        case 'SET-ERROR':
            const copyState = {...state}
            copyState.userData.error = action.payload.error
            return copyState
        default:
            return state
    }
}


export const setIsLoggedIn = (payload: { isLoggedIn: boolean, userData: UserDataType }) => ({
    type: 'SET-IS-LOGGED-IN',
    payload
} as const)
export const setIsLoggedOut = (payload: { isLoggedIn: boolean }) => ({type: 'SET-IS-LOGGED-OUT', payload} as const)
export const setError = (payload: { isLoggedIn: boolean, error: string }) => ({type: 'SET-ERROR', payload} as const)


export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        const response = await loginApi.login(data)
        dispatch(setIsLoggedIn({isLoggedIn: true, userData: {...response.data}}))
    } catch (e: any) {
        e.response.data.error ?
            dispatch(setError({isLoggedIn: false, error: e.response.data.error})) :
            dispatch(setError({isLoggedIn: false, error: 'some error occurred'}))
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    await loginApi.logout()
    dispatch(setIsLoggedOut({isLoggedIn: false}))
}


type ActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsLoggedOut>
    | ReturnType<typeof setError>

type ThunkDispatch = any
