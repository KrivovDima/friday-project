import {RecoveryStatusType} from "./passwordRecoveryReducer";
import {Dispatch} from "redux";
import {passwordRecoveryAPI} from "../api/passwordRecoveryAPI";
import axios from "axios";

type InitialStateType = {
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
}


export const setNewPasswordStatus = (status: RecoveryStatusType) => ({
  type: 'SET_NEW_PASSWORD_STATUS',
  payload: {status}
} as const);
export const setError = (error: string) => ({
  type: 'SET_ERROR',
  payload: {error}
} as const);

export const inputNewPassword = (password: string, resetPasswordToken: string | undefined) => async (dispatch: Dispatch<ActionsType>) => {
  try {
    dispatch(setNewPasswordStatus("loading"));
    await passwordRecoveryAPI.inputNewPass(password, resetPasswordToken);
    dispatch(setNewPasswordStatus("succeeded"));
  } catch (e) {
    if(axios.isAxiosError(e) && e.response) {
      dispatch(setNewPasswordStatus("failed"));
      dispatch(setError(e.response.data.error))
    }
  }
}