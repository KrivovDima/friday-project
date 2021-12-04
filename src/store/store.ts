import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import {LoginActionsType, loginReducer} from "./loginReducer";
import {
  PasswordRecoveryActionsType,
  passwordRecoveryReducer
} from "./passwordRecoveryReducer";
import {profileReducer} from "./profileReducer";
import {CardPacksActionsType, cardPacksReducer} from './cardPacksReducer';
import {AppActionsType, appReducer} from './appReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  passwordRecovery: passwordRecoveryReducer,
  profile: profileReducer,
  cardPacks: cardPacksReducer,
  app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>

type ActionsTypeApp = PasswordRecoveryActionsType | LoginActionsType | CardPacksActionsType | AppActionsType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsTypeApp>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;