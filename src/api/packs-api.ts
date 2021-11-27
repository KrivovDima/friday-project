import {instance} from "./instanceAPI";
import {PackType} from "../store/cardPacksReducer";

export type QueryRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string | null
    page?: number
    pageCount?: number
    userID?: string
    name?: string
}

export const packsAPI = {
    getPacks(data: QueryRequestType) {
        return instance.get(`cards/pack`, {params: data})
    },
    postPacks(data: PackType) {
return instance.post(`cards/pack`,  data)
    }
}