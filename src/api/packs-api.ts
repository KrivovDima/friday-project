import {instance} from "./instanceAPI";
import {NewCardsPackType} from "../store/cardPacksReducer";

export type QueryRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string | null
    page?: number
    pageCount?: number
    user_id?: string | null
    name?: string
}

export const packsAPI = {
    getPacks(data: QueryRequestType) {
        return instance.get(`cards/pack`, {params: data})
    },
    postPacks(cardsPack: NewCardsPackType) {
        return instance.post(`cards/pack`, {cardsPack})
    },
    deletePacks(packsID: string) {
        return instance.delete(`cards/pack?${packsID}`)
    }
}