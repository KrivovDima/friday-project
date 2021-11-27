import {Dispatch} from 'redux';
import {registrationAPI} from '../api/registrationAPI';
import axios from 'axios';
import {setAppError, setAppStatus, setIsInitialized} from './appReducer';

export const registration = (email: string, password: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        await registrationAPI.register(email, password);
        dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError(e.response.data.error));
        } else {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError({error: 'Error, contact support'}));
        }
    }
}

type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>