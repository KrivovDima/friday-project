import {instance} from "./instanceAPI";
import {PackType} from "../store/cardPacksReducer";

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
    // изменил типизацию data так как в запросе много необязательных полей
    postPack(cardsPack: PostPacksBodyType) {
return instance.post(`cards/pack`,  {cardsPack})
    },
    deletePack(idPack: string) {
        return instance.delete(`cards/pack?id=${idPack}`)
    },
    editPack(cardsPack: EditPackBodyType) {
        return instance.put('cards/pack', {cardsPack})
    }
}

type PostPacksBodyType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type EditPackBodyType = {
    _id: string
    name?: string
}
