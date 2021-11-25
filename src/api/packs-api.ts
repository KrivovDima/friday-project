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
    getPacks(packName?: string,
             min?: number,
             max?: number,
             sortPacks?: number,
             page?: number,
             pageCount?: number,
             userID?: string) {

        if(packName) {
            return instance.get(`cards/pack?packName=${packName}`)
        }
        else if(min) {
            return instance.get(`cards/pack?min=${min}`)
        }
        else if(max) {
            return instance.get(`cards/pack?min=${max}`)
        }
        else if(sortPacks) {
            return instance.get(`cards/pack?sortPacks=${sortPacks}updated`)
        }
        else if(page) {
            return instance.get(`cards/pack?page=${page}`)
        }
        else if(pageCount) {
            return instance.get(`cards/pack?pageCount=${pageCount}`)
        }
        else if(userID) {
            return instance.get(`cards/pack?userID=${userID}`)
        }
        return instance.get(`cards/pack`)
    },
    postPacks() {

    }
}