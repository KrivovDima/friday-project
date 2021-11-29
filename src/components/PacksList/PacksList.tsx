import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './PacksList.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    addNewCardPack,
    requestCardPack,
    setMinMaxCardsCount,
    setPacksPage,
    setPacksPageCount,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import Table from '../Table/Table';
import {SearchInput} from '../SearchInput/SearchInput';
import {Paginator} from '../Paginator/Paginator';
import Preloader from '../Preloader/Preloader';


export const PacksList = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)
    const minCardsCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const min = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.min)
    const maxCardsCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)
    const max = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.max)
    const page = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const packName = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.packName)
    const pageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const totalCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacksTotalCount)
    const userIdForRequest = useSelector((state: AppRootStateType) => state.cardPacks.user_id)


    useEffect(() => {
        debugger
        isLoggedIn && dispatch(requestCardPack({}))
    }, [min, max, page, pageCount, packName, userIdForRequest])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const onAdd = () => {
        dispatch(addNewCardPack( {name: 'bla bla'}))
        dispatch(requestCardPack({}))
    }

    return (
        <div className={s.listContainer}>
            {appStatus === 'loading' && <Preloader/>}
            <div className={s.controls}>
                <div className={s.description}>Show packs cards</div>
                <ShowPacksCardsButtons
                    disabled={appStatus === 'loading'}/>
                <div className={s.description}>Number of cards</div>
                <DoubleRange
                    min={minCardsCount}
                    max={maxCardsCount}
                    setMinMaxAction={setMinMaxCardsCount}
                    disabled={appStatus === 'loading'}/>
            </div>
            <div className={s.viewInfo}>
                <div className={s.title}>Packs list</div>
                <div className={s.inputWrapper}>
                    <SearchInput
                        setSearch={setSearchPacksName}
                        disabled={appStatus === 'loading'}/>
                    <div style={{width: '24px'}}/>
                    <button
                        disabled={appStatus === 'loading'}
                        className={s.mainButton}
                        onClick={onAdd}
                    >
                        Add new pack
                    </button>
                </div>
                <Table/>
                <Paginator
                    page={page}
                    pageCount={pageCount}
                    totalCount={totalCount}
                    setPageAction={setPacksPage}
                    setPageCountAction={setPacksPageCount}
                    disabled={appStatus === 'loading'}/>
            </div>
        </div>
    )
}