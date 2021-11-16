import {Dispatch} from "redux";
import {passwordRecoveryAPI} from "../api/passwordRecoveryAPI";

export type RecoveryStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RecoveryStatusType
    error: string
}

const initialState: InitialStateType = {
    status: "idle",
    error: '',
}

type ActionsType = ReturnType<typeof setStatusPasswordRecovery> | ReturnType<typeof setErrorPasswordRecovery>

export const passwordRecoveryReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_STATUS_PASSWORD_RECOVERY': {
            return {...state, ...action.payload};
        }
        case 'SET_ERROR_PASSWORD_RECOVERY': {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}

export const setStatusPasswordRecovery = (status: RecoveryStatusType) => ({
    type: 'SET_STATUS_PASSWORD_RECOVERY',
    payload: {status}
} as const);
export const setErrorPasswordRecovery = (error: string) => ({
    type: 'SET_ERROR_PASSWORD_RECOVERY',
    payload: {error}
} as const);

export const passwordRecovery = (email: string, message: () => any) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setStatusPasswordRecovery("loading"));
        await passwordRecoveryAPI.passRecovery(email, message);
        dispatch(setStatusPasswordRecovery("succeeded"));
    } catch (e) {
        dispatch(setStatusPasswordRecovery("failed"));
        //@ts-ignore
        dispatch(setErrorPasswordRecovery(e.response.data.error))
    }
}