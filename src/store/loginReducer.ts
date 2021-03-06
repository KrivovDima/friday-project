import {Dispatch} from 'redux'
import {loginApi, LoginParamsType} from '../api/login-api';
import {setAppError, setAppStatus} from './appReducer';
import errorResponseHandler from '../utils/errorResponseHandler';

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
    error?: string | null
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
        error: null
    },
}

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn, userData: {...action.payload.userData}};
        case 'SET-IS-LOGGED-OUT':
            return {...state, isLoggedIn: action.payload.isLoggedIn, userData: {...initialState.userData}};
        default:
            return state
    }
}


export const setIsLoggedIn = (payload: { isLoggedIn: boolean, userData: UserDataType }) => ({
    type: 'SET-IS-LOGGED-IN',
    payload
} as const);
export const setIsLoggedOut = (payload: { isLoggedIn: boolean }) => ({type: 'SET-IS-LOGGED-OUT', payload} as const);


export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const response = await loginApi.login(data)
        dispatch(setAppError({error: ''}))
        dispatch(setIsLoggedIn({isLoggedIn: true, userData: {...response.data}}))
        dispatch(setAppStatus({status: 'succeeded'}))

    } catch (e) {
        errorResponseHandler(e, dispatch)
        /*if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppError({error: e.response.data.error}))
        } else dispatch(setAppError({error: 'Some error occurred, check your connection.'}))
        dispatch(setAppStatus({status: 'failed'}))*/
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    await loginApi.logout()
    dispatch(setIsLoggedOut({isLoggedIn: false}))
    dispatch(setAppStatus({status: 'succeeded'}))
    dispatch(setAppError({error: ''}))
}


export type LoginActionsType =
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsLoggedOut>