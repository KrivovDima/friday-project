import {packsAPI, QueryRequestType} from "../api/packs-api";
import {Dispatch} from "redux";


export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    // path: string
    // grade: number
    // shots: number
    cardsCount: number
    // type: string
    // rating: number
    created: string
    updated: string
    more_id: string
    // __v: number
}
export type CardPacksType = {
    cardPacks: PackType[]
    page: number
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    // token: string,
    // tokenDeathTime: number
}

export type CardType = {
    answer: string
    answerImg: null | string
    answerVideo: null | string
    cardsPack_id: string
    comments: null | string
    created: string
    grade: number
    question: string
    questionImg: null | string
    questionVideo: null | string
    // rating: number
    shots: number
    // type: string
    updated: string
    user_id: string
    // __v: string
    _id: string
}
export type CardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type InitialStateType = {
    currentCardPacks: CardPacksType
    currentCards: CardsType
}


export const initialState: InitialStateType = {
    currentCardPacks: {
        cardPacks: [],
        page: 1,
        pageCount: 4,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        maxCardsCount: 999,
    },
    currentCards: {
        cards: [],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        packUserId: '',
        page: 1,
        pageCount: 4,
        token: '',
        tokenDeathTime: 0,
    }
}

export const cardPacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARD-PACKS':
            return {...state, currentCardPacks: {...state.currentCardPacks, cardPacks: action.payload.cardPacks}};
        case 'SET-MIN-MAX-CARDS-COUNT':
            return {
                ...state,
                currentCardPacks: {
                    ...state.currentCardPacks,
                    minCardsCount: action.payload.minCardsCount,
                    maxCardsCount: action.payload.maxCardsCount
                }
            };
        case 'SET-PACKS-PAGE':
            return {...state, currentCardPacks: {...state.currentCardPacks, page: action.payload.page}};
        case 'SET-PACKS-PAGE-COUNT':
            return {...state, currentCardPacks: {...state.currentCardPacks, pageCount: action.payload.pageCount}};
        case 'ADD-PACK':
            return {
                ...state,
                currentCardPacks: {
                    ...state.currentCardPacks,
                    cardPacks: [action.payload, ...state.currentCardPacks.cardPacks]
                }
            }
        default:
            return state
    }
}


export const setCardPacks = (cardPacks: Array<PackType>) => ({type: 'SET-CARD-PACKS', payload: {cardPacks}} as const)
export const setMinMaxCardsCount = (payload: {
    minCardsCount: number,
    maxCardsCount: number
}) => ({type: 'SET-MIN-MAX-CARDS-COUNT', payload} as const)
export const setPacksPage = (payload: { page: number }) => ({type: 'SET-PACKS-PAGE', payload} as const)
export const setPacksPageCount = (payload: { pageCount: number }) => ({type: 'SET-PACKS-PAGE-COUNT', payload} as const)

export const addPack = (newPack: PackType) => ({type: 'ADD-PACK', payload: newPack} as const)




type CardPacksActionsTypes = | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setMinMaxCardsCount>
    | ReturnType<typeof setPacksPage>
    | ReturnType<typeof setPacksPageCount>
    | ReturnType<typeof addPack>



type ActionsType = CardPacksActionsTypes

export const requestCardPack = (data: QueryRequestType) => async (dispatch: Dispatch) => {
    //dispatch(setPacksPage(data.page))
    let response = await packsAPI.getPacks(data);
    dispatch(setCardPacks(response.data.cardPacks))
    // dispatch(setMinMaxCardsCount())
    //dispatch(setPacksPageCount())
}

export const addCardPack = (data: PackType) => async (dispatch: Dispatch) => {
    let response = await packsAPI.postPacks(data)
    dispatch(addPack(data))
}