import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {registrationReducer} from "./registrationReducer";
import {loginReducer} from "./loginReducer";
import {inputNewPasswordReducer} from "./inputNewPasswordReducer";
import {passwordRecoveryReducer} from "./passwordRecoveryReducer";
import {profileReducer} from "./profileReducer";
import {cardPacksReducer} from './cardPacksReducer';

const rootReducer = combineReducers({
  inputNewPassword: inputNewPasswordReducer,
  login: loginReducer,
  passwordRecovery: passwordRecoveryReducer,
  profile: profileReducer,
  registration: registrationReducer,
  cardPacks: cardPacksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;