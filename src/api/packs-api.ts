import {instance} from "./instanceAPI";

export type QueryRequestType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: number
    page?: number
    pageCount?: number
    userID?: string
}

export const packsAPI = {
    getPacks(data: QueryRequestType) {
        return instance.get(`cards/pack`, {params: data})
    },
    postPacks() {

    }
}