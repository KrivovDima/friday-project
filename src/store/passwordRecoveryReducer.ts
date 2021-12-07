import {Dispatch} from 'redux';
import {passwordRecoveryAPI} from '../api/passwordRecoveryAPI';
import {setAppError, setAppStatus, setIsInitialized} from './appReducer';
import errorResponseHandler from '../utils/errorResponseHandler';

export type RecoveryStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    email: string
}

const initialState: InitialStateType = {
    email: '',
}

export type PasswordRecoveryActionsType = ReturnType<typeof setEmail>
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>

export const passwordRecoveryReducer = (state = initialState, action: PasswordRecoveryActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_EMAIL': {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}

export const setEmail = (email: string) => ({
    type: 'SET_EMAIL',
    payload: {email}
} as const);

export const passwordRecovery = (email: string, message: () => JSX.Element) => async (dispatch: Dispatch<PasswordRecoveryActionsType>) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        await passwordRecoveryAPI.passRecovery(email, message);
        dispatch(setAppError({error: ''}))
        dispatch(setAppStatus({status: 'succeeded'}));
        dispatch((setEmail(email)))
    } catch (e) {
        errorResponseHandler(e, dispatch)
        /*if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError(e.response.data.error))
        }*/
    }
}