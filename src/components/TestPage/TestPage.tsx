import React, {useEffect} from 'react';
import s from './testPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {PackType, requestCardPack} from "../../store/cardPacksReducer";
import {AppRootStateType} from "../../store/store";

function TestPage() {

    const packs = useSelector<AppRootStateType, Array<any>>(state => state.cardPacks.currentCardPacks.cardPacks);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestCardPack({pageCount: 10, page: 4, packName: 'Fun'}))
    }, [])

    debugger
    return (
        <div className={s.testContainer}>
            {packs.map(p => {
                debugger
                return <div className={s.names}>
                    {p.name}
                </div>
            })}
        </div>
    );
}

export default TestPage;