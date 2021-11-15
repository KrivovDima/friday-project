import {Dispatch} from "redux";
import {registrationAPI} from "../api/registrationAPI";
import axios from 'axios';

export type RegistrationStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RegistrationStatusType
    error: string
}

type ActionsType = ReturnType<typeof changeStatusRegistration> | ReturnType<typeof setErrorRegistration>

const initialState: InitialStateType = {
    status: "idle",
    error: '',
}

export const registrationReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-STATUS-REGISTRATION": {
            return {...state, ...action.payload};
        }
        case "SET-ERROR-REGISTRATION": {
            return {...state, ...action.payload};
        }
        default: {
            return state;
        }
    }
}

// action creators
export const changeStatusRegistration = (status: RegistrationStatusType) => ({
    type: 'CHANGE-STATUS-REGISTRATION',
    payload: {status}
} as const);
export const setErrorRegistration = (error: string) => ({type: 'SET-ERROR-REGISTRATION', payload: {error}} as const);

// thunk creators
export const registration = (email: string, password: string) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(changeStatusRegistration("loading"));
        await registrationAPI.register(email, password);
        dispatch(changeStatusRegistration("succeeded"));
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            dispatch(changeStatusRegistration("failed"));
            dispatch(setErrorRegistration(e.response.data.error));
        }
    }
}