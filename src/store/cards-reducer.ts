import {CardsType, initialState, InitialStateType} from "./cardPacksReducer";
import {cardsAPI, CardsQueryRequestType} from "../api/cards-api";
import {Dispatch} from "redux";

export const cardReducer = (state: InitialStateType = initialState, action: CardsActionsTypes): InitialStateType => {
    debugger
    switch (action.type) {
        case 'SET-CARDS':
            debugger
            return {...state, currentCards: action.payload.cards}
        case 'SET-CARDS-PAGE':
            return {...state, currentCards: {...state.currentCards, page: action.payload.page}};
        case 'SET-CARDS-PAGE-COUNT':
            return {...state, currentCards: {...state.currentCards, pageCount: action.payload.pageCount}};
        default:
            return state;
    }
}

type CardsActionsTypes = | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>


export const setCards = (cards: CardsType) => ({type: 'SET-CARDS', payload: {cards}} as const)
export const setCardsPage = (payload: { page: number }) => ({type: 'SET-CARDS-PAGE', payload} as const)
export const setCardsPageCount = (payload: { pageCount: number }) => ({type: 'SET-CARDS-PAGE-COUNT', payload} as const)

export const requestCards = (data: CardsQueryRequestType) => async (dispatch: Dispatch) => {
    let response = await cardsAPI.getCards(data)
    dispatch(setCards(response.data))
    debugger
}