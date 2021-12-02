import {packsAPI, QueryRequestType} from '../api/packs-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppError, setAppStatus} from './appReducer';
import axios from 'axios';
import {cardsAPI, CardsQueryRequestType} from '../api/cards-api';

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
type CardPacksType = {
    cardPacks: PackType[]
    page: number
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    min: number,
    maxCardsCount: number,
    max: number,
    packName: string,
    sortPacks: string | null
    // token: string,
    // tokenDeathTime: number
}

type CardType = {
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
type CardsType = {
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

type NewCardsPackType = {
    name?: string
    path?: string
    grade?: number | null
    shots?: number | null
    rating?: number | null
    deckCover?: string
    private?: boolean
    type?: string
}

type InitialStateType = {
    currentCardPacks: CardPacksType
    currentCards: CardsType
    currentPackName: string,
    currentCardsPackId: string
    user_id: null | string
    newCardsPack: NewCardsPackType
}

const initialState: InitialStateType = {
    currentCardPacks: {
        cardPacks: [],
        page: 1,
        pageCount: 4,
        cardPacksTotalCount: 0,
        minCardsCount: 0,
        min: 0,
        maxCardsCount: 999,
        max: 999,
        packName: '',
        sortPacks: null
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
    },
    currentPackName: '',
    currentCardsPackId: '',
    user_id: null,
    newCardsPack: {
        name: '',
        path: '',
        grade: null,
        shots: null,
        rating: null,
        deckCover: '',
        private: false,
        type: '',
    }
}

export const cardPacksReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-CARD-PACKS':
            return {...state, currentCardPacks: {...state.currentCardPacks, ...action.payload.cardPacks}};
        case 'SET-MIN-MAX-CARDS-COUNT':
            return {
                ...state,
                currentCardPacks: {
                    ...state.currentCardPacks,
                    min: action.payload.min,
                    max: action.payload.max
                }
            };
        case 'SET-PACKS-PAGE':
            return {...state, currentCardPacks: {...state.currentCardPacks, page: action.payload.page}};
        case 'SET-PACKS-PAGE-COUNT':
            return {...state, currentCardPacks: {...state.currentCardPacks, pageCount: action.payload.pageCount}};
        case 'SET-SEARCH-PACKS-NAME':
            return {...state, currentCardPacks: {...state.currentCardPacks, packName: action.payload.packName}};
        case 'SET-SORT-PACKS':
            return {...state, currentCardPacks: {...state.currentCardPacks, sortPacks: action.payload.sortPacks}}
        case 'SET-CURRENT-PACK-NAME':
            return {...state, currentPackName: action.payload.currentPackName}

        case 'SET-CARDS':
            debugger
            return {...state, currentCards: {...state.currentCards, ...action.payload.cards}};
        case 'SET-CARDS-PAGE':
            return {...state, currentCards: {...state.currentCards, page: action.payload.page}};
        case 'SET-CARDS-PAGE-COUNT':
            return {...state, currentCards: {...state.currentCards, pageCount: action.payload.pageCount}};

        case 'SET-CURRENT-CARDS-PACK-ID':
            return {...state, currentCardsPackId: action.payload.currentCardsPackId};

        case 'SET-USER-ID':
            return {...state, user_id: action.payload.user_id}

        case 'ADD-NEW-CARDS-PACK':
            return {...state, newCardsPack: {...action.payload.cardsPack}}

        default:
            return state
    }
}


export const setCardPacks = (cardPacks: CardPacksType) => ({type: 'SET-CARD-PACKS', payload: {cardPacks}} as const)
export const setSearchPacksName = (payload: { packName: string }) => ({type: 'SET-SEARCH-PACKS-NAME', payload} as const)
export const setSortPacks = (payload: { sortPacks: string }) => ({type: 'SET-SORT-PACKS', payload} as const)
export const setCurrentPackName = (payload: { currentPackName: string }) => ({type: 'SET-CURRENT-PACK-NAME', payload} as const)
export const setMinMaxCardsCount = (payload: { min: number, max: number }) => ({
    type: 'SET-MIN-MAX-CARDS-COUNT',
    payload
} as const)
export const setPacksPage = (payload: { page: number }) => ({type: 'SET-PACKS-PAGE', payload} as const)
export const setPacksPageCount = (payload: { pageCount: number }) => ({type: 'SET-PACKS-PAGE-COUNT', payload} as const)

export const setCards = (cards: CardsType) => ({type: 'SET-CARDS', payload: {cards}} as const)
export const setCardsPage = (payload: { page: number }) => ({type: 'SET-CARDS-PAGE', payload} as const)
export const setCardsPageCount = (payload: { pageCount: number }) => ({type: 'SET-CARDS-PAGE-COUNT', payload} as const)

export const setCurrentCardsPackID = (payload: { currentCardsPackId: string }) => ({
    type: 'SET-CURRENT-CARDS-PACK-ID',
    payload
} as const)

export const setUserId = (payload: { user_id: string }) => ({type: 'SET-USER-ID', payload} as const)

export const addNewCardsPack = (payload: { cardsPack: NewCardsPackType }) => ({
    type: 'ADD-NEW-CARDS-PACK',
    payload
} as const)


type CardPacksActionsTypes = | ReturnType<typeof setCardPacks>
    | ReturnType<typeof setMinMaxCardsCount>
    | ReturnType<typeof setPacksPage>
    | ReturnType<typeof setPacksPageCount>
    | ReturnType<typeof setSearchPacksName>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof addNewCardsPack>
    | ReturnType<typeof setCurrentPackName>

type CardsActionsTypes = | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>


type ActionsType =
    CardPacksActionsTypes
    | CardsActionsTypes
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setCurrentCardsPackID>

export const requestCardPack = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const {cardPacks, ...requestData} = getState().cardPacks.currentCardPacks
    const user_id = getState().cardPacks.user_id
debugger
    /*const page = state.cardPacks.currentCardPacks.page;
    const min = state.cardPacks.currentCardPacks.minCardsCount;
    const max = state.cardPacks.currentCardPacks.maxCardsCount;
    const pageCount = state.cardPacks.currentCardPacks.pageCount;
    const packName = state.cardPacks.currentCardPacks.packName;
    const sortPacks = state.cardPacks.currentCardPacks.sortPacks
    const request = {page, min, max, pageCount, packName, sortPacks}*/

    try {
        dispatch(setAppStatus({status: 'loading'}))
        let response = await packsAPI.getPacks({...requestData, user_id});
        dispatch(setCardPacks(response.data));
        dispatch(setAppStatus({status: 'succeeded'}))
        dispatch(setAppError({error: ''}))
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            dispatch(setAppError({error: e.response.data.error}))
        } else dispatch(setAppError({error: 'some error occurred'}))
        dispatch(setAppStatus({status: 'failed'}))
    }
}

//санка для добавления  newCardsPack из redux, после получения всех тасок, newCardsPack в redux очистить
// санка для сортировки (отправить sortpacks из redux) затем после ответа занулить в redux

export const requestCards = (data?: CardsQueryRequestType) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const page = getState().cardPacks.currentCards.page
    const pageCount = getState().cardPacks.currentCards.pageCount
    const currentCardsPackId = getState().cardPacks.currentCardsPackId

    let response = await cardsAPI.getCards({...data, page, pageCount, cardsPack_id: currentCardsPackId})
    debugger
    dispatch(setCards(response.data))

}