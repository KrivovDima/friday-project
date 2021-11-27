import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './CardsList.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
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


export const CardsList = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const error = useSelector((state: AppRootStateType) => state.login.userData.error)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)
    const minCardsCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.minCardsCount)
    const min = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.min)
    const maxCardsCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.maxCardsCount)
    const max = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.max)
    const page = useSelector((state:AppRootStateType) => state.cardPacks.currentCardPacks.page)
    const packName = useSelector((state:AppRootStateType) => state.cardPacks.currentCardPacks.packName)
    const pageCount = useSelector((state:AppRootStateType) => state.cardPacks.currentCardPacks.pageCount)
    const totalCount = useSelector((state:AppRootStateType) => state.cardPacks.currentCardPacks.cardPacksTotalCount)



    useEffect(()=>{
        debugger
        isLoggedIn && dispatch(requestCardPack({}))
    },[min, max, page, pageCount, packName])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const onAdd = () => {
        // dispatch(   ({name: 'bla bla'}))
    }

    return (
        <div className={s.listContainer}>
            {appStatus === 'loading' && <Preloader/>}
            <div className={s.viewInfo}>
                <div>back</div>
                <div className={s.title}>Pack Name</div>
                <div className={s.inputWrapper}>
                    <SearchInput
                        setSearch={setSearchPacksName}
                        disabled={appStatus === 'loading'}/>
                </div>
                <Table/>
                <Paginator
                    page={page}
                    pageCount={pageCount}
                    totalCount={totalCount}
                    setPageAction={setPacksPage}
                    setPageCountAction={setPacksPageCount}
                    disabled={appStatus === 'loading'}/>
                {error && error}
            </div>
        </div>
    )
}