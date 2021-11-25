import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {setMinMaxCardsCount, setPacksPage, setPacksPageCount} from '../../store/cardPacksReducer';
import s from './TestPage.module.css'
import {Paginator} from '../Paginator/Paginator';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {SearchInput} from '../SearchInput/SearchInput';
import {AppStatusType} from '../../store/appReducer';

function TestPage() {

    const minPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const maxPacksCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)

    const currentPage = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const currentPageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const cardPacksTotalCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacksTotalCount)

    const appStatus = useSelector((state: AppRootStateType) => state.app.status)

    return (
        <div className={s.testPageContainer}>
            TestPage
            <hr/>
            <hr/>
            <DoubleRange
                min={minPacksCount}
                max={maxPacksCount}
                setMinMaxAction={setMinMaxCardsCount}
                disabled={appStatus === 'loading'}
            />
            <hr/>
            <Paginator
                // page={currentPage}
                page={4}
                // pageCount={currentPageCount}
                pageCount={7}
                // totalCount={cardPacksTotalCount}
                totalCount={200}
                setPageAction={setPacksPage}
                setPageCountAction={setPacksPageCount}
                disabled={appStatus === 'loading'}
            />
            <hr/>
            <ShowPacksCardsButtons
                disabled={appStatus === 'loading'}/>
            <hr/>
            <SearchInput
            disabled={appStatus === 'loading'}/>

        </div>
    );
}

export default TestPage;