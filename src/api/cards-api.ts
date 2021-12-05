import {instance} from "./instanceAPI";
import {PackType} from "../store/cardPacksReducer";

export type CardsQueryRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string | null
    page?: number
    pageCount?: number
}

export const cardsAPI = {
    getCards(data: CardsQueryRequestType) {
        return instance.get(`cards/card`, {params: data})
    },
    postCards(data: PackType) {
        return instance.post(`cards/pack`,  data)
    },
    putGradeCard(grade: number, card_id: string) {
        return instance.put('cards/grade', {grade, card_id})
    }
}