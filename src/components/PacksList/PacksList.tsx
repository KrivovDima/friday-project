import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './PacksList.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate} from 'react-router-dom';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    addNewCardsPack, PackType,
    requestCardPack,
    setMinMaxCardsCount,
    setPacksPage,
    setPacksPageCount,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import {SearchInput} from '../SearchInput/SearchInput';
import {Paginator} from '../Paginator/Paginator';
import Preloader from '../Preloader/Preloader';
import PackListRow from './PackListRow';


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
    const dataPacksList = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.cardPacks)


    const packsListHeader = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

    useEffect(() => {
        debugger
        isLoggedIn && dispatch(requestCardPack())
    }, [min, max, page, pageCount, packName, userIdForRequest])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }


    const onAdd = () => {
        dispatch(addNewCardsPack({cardsPack: {name: 'bla bla'}}))
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
                <div className={s.table}>
                    <div className={`${s.header} ${s.packListRow}`}>
                        {packsListHeader.map((cell, index) => <div key={index} className={s.tableCell}>{cell}</div>)}
                    </div>
                    {dataPacksList.length &&
                    dataPacksList.map(({name, cardsCount, updated, user_name, _id}: PackType, index: number) => (
                        <PackListRow key={_id} data={{name, cardsCount, updated, user_name, _id}} indexRow={index}
                                     openLearn={() => {
                                     }}/>))}
                </div>
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