import {RecoveryStatusType} from "./passwordRecoveryReducer";
import {Dispatch} from "redux";
import {passwordRecoveryAPI} from "../api/passwordRecoveryAPI";
import axios from "axios";
import {setAppError, setAppStatus, setIsInitialized} from './appReducer';

/*type InitialStateType = {
  status: RecoveryStatusType
  error: string
}

const initialState: InitialStateType = {
  status: "idle",
  error: '',
}

type ActionsType = ReturnType<typeof setNewPasswordStatus> | ReturnType<typeof setError>

export const inputNewPasswordReducer = (state= initialState, action: any) => {
  switch (action.type) {
    case 'SET_NEW_PASSWORD_STATUS': {
      return {...state, ...action.payload};
    }
    case 'SET_ERROR': {
      return {...state, ...action.payload};
    }
    default: {
      return state;
    }
  }
}*/


/*
export const setNewPasswordStatus = (status: RecoveryStatusType) => ({
  type: 'SET_NEW_PASSWORD_STATUS',
  payload: {status}
} as const);
export const setError = (error: string) => ({
  type: 'SET_ERROR',
  payload: {error}
} as const);
*/

export const inputNewPassword = (password: string, resetPasswordToken: string | undefined) => async (dispatch: Dispatch<ActionsType>) => {
  try {
    dispatch(setAppStatus({status:"loading"}));
    await passwordRecoveryAPI.inputNewPass(password, resetPasswordToken);
    dispatch(setAppStatus({status: "succeeded"}));
  } catch (e) {
    if(axios.isAxiosError(e) && e.response) {
      dispatch(setAppStatus({status: "failed"}));
      dispatch(setAppError(e.response.data.error))
    }
  }
}

type ActionsType =
    | ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>