import {Dispatch} from "redux";
import {ActionsTypeApp} from "../store/store";
import {setSortCards, setSortPacks} from "../store/cardPacksReducer";

export const helperSetFilter = (
    nextValueFilter: string | null,
    setFilter: (value: string | null) => void,
    typeTable: string,
    dispatch: Dispatch,
    filterText: string,
) => {
    setFilter(nextValueFilter)
    if (typeTable === "packs") {
        dispatch(setSortPacks(nextValueFilter && `${nextValueFilter}${filterText}`))
    } else {
        dispatch(setSortCards(nextValueFilter && `${nextValueFilter}${filterText}`))
    }
}
