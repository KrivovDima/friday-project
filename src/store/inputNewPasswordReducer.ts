import {Dispatch} from 'redux';
import {passwordRecoveryAPI} from '../api/passwordRecoveryAPI';
import axios from 'axios';
import {setAppError, setAppStatus, setIsInitialized} from './appReducer';

export const inputNewPassword = (password: string, resetPasswordToken: string | undefined) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        await passwordRecoveryAPI.inputNewPass(password, resetPasswordToken);
        dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError(e.response.data.error))
        }
    }
}

type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>