import {instance} from "./instanceAPI";
import {CardType, PackType} from "../store/cardPacksReducer";

export type CardsQueryRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export const cardsAPI = {
    getCards(data: CardsQueryRequestType) {
        return instance.get(`cards/card`, {params: data})
    },
    postCards(data: CardType) {
        return instance.post(`cards/pack`, {data})
    }
}