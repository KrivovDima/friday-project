import {Dispatch} from 'redux'

const initialState: InitialStateType = {
    isLoggedIn: false
}
type InitialStateType = {
    isLoggedIn: boolean
}

export const loginReducer = (state = initialState, action: ActionsType): any => {
    switch (action.type) {

        default:
            return state
    }
}


// actions
export const firstLoginReducerAC = (payload: any) => ({type: 'some-type', payload} as const)


// thunks
export const firstLoginReducerTC = (payload: string) => (dispatch: Dispatch) => {
    //servers requests
}


// types

type ActionsType =
    | ReturnType<typeof firstLoginReducerAC>

type ThunkDispatch = any
