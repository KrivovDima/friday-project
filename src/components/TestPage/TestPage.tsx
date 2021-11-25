import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {requestCardPack, setMinMaxCardsCount, setPacksPage, setPacksPageCount} from '../../store/cardPacksReducer';
import s from './TestPage.module.css'
import {Paginator} from '../Paginator/Paginator';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {SearchInput} from '../SearchInput/SearchInput';
import Table from "../Table/Table";

function TestPage() {

    const dispatch = useDispatch()

    const minPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const maxPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)

    const currentPage = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const currentPageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const cardPacksTotalCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacksTotalCount)

   // const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    const appStatus = 'idle'

    useEffect(() => {
        dispatch(requestCardPack({packName: 'alo'}))
    }, [])

    return (
        <div className={s.testPageContainer}>
            TestPage
            <hr/>
            <hr/>
            <DoubleRange
                min={minPacksCount}
                max={maxPacksCount}
                setMinMaxAction={setMinMaxCardsCount}
                disabled={false}
            />

           {/* disabled={appStatus === 'loading'}*/}

            <hr/>
            <Paginator
                // page={currentPage}
                page={currentPage}
                // pageCount={currentPageCount}
                pageCount={currentPageCount}
                // totalCount={cardPacksTotalCount}
                totalCount={200}
                setPageAction={setPacksPage}
                setPageCountAction={setPacksPageCount}
                disabled={false}
            />
            <hr/>
            <ShowPacksCardsButtons
                disabled={false}/>
            <hr/>
            <SearchInput
                setSearch={requestCardPack}
            disabled={false}/>

            <Table />

        </div>
    );
}

export default TestPage;