import {Dispatch} from 'redux'

const initialState: InitialStateType = {
    isLoggedIn: false
}
type InitialStateType = {
    isLoggedIn: boolean
}

export const loginReducer = (state = initialState, action: ActionsType): any => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
        return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}


// actions
export const setIsLoggedIn = (payload: { isLoggedIn: boolean }) => ({type: 'SET-IS-LOGGED-IN', payload} as const)


// thunks
export const firstLoginReducerTC = (payload: string) => (dispatch: Dispatch) => {
    //servers requests
}


// types

type ActionsType =
    | ReturnType<typeof setIsLoggedIn>

type ThunkDispatch = any
