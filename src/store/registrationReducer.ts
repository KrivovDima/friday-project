import {Dispatch} from 'redux';
import {registrationAPI} from '../api/registrationAPI';
import {setAppError, setAppStatus, setIsInitialized} from './appReducer';
import errorResponseHandler from '../utils/errorResponseHandler';

export const registration = (email: string, password: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatus({status: 'loading'}));
        await registrationAPI.register(email, password);
        dispatch(setAppError({error: ''}))
        dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e) {
        errorResponseHandler(e, dispatch)
        /*if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError(e.response.data.error));
        } else {
            dispatch(setAppStatus({status: 'failed'}));
            dispatch(setAppError({error: 'Some error occurred, check your connection.'}));
        }*/
    }
}

type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>