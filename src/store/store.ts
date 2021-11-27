import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "./loginReducer";
import {passwordRecoveryReducer} from "./passwordRecoveryReducer";
import {profileReducer} from "./profileReducer";
import {cardPacksReducer} from './cardPacksReducer';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  passwordRecovery: passwordRecoveryReducer,
  profile: profileReducer,
  cardPacks: cardPacksReducer,
  app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;