import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './PacksList.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {ShowPacksCardsButtons} from '../ShowPacksCardsButtons/ShowPacksCardsButtons';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    addNewCardsPack,
    addNewPack, PackType,
    requestCardPack, setMinMaxCardsCount,
    setPacksPage,
    setPacksPageCount,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import {SearchInput} from '../SearchInput/SearchInput';
import {Paginator} from '../Paginator/Paginator';
import Preloader from '../Preloader/Preloader';
import PackListRow from './PackListRow';
import {packsAPI} from "../../api/packs-api";
import {setAppStatus} from "../../store/appReducer";
import {TableHeaderCell} from "../TableHeaderCell/TableHeaderCell";
import ModalWindow from "../Modal/ModalWindow";
import ModalDeletePack from "../Modal/ModalDeletePack";
import ModalAddNewPack from "../Modal/ModalAddNewPack";


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
    const sortPacks = useSelector((state: AppRootStateType) => state.cardPacks.currentCardPacks.sortPacks)
    const navigate = useNavigate()
    const packsListHeader = [
        {text: 'Name', filterText: 'name'},
        {text: 'Cards', filterText: 'cardsCount'},
        {text: 'Last Updated', filterText: 'updated'},
        {text: 'Created by', filterText: 'created'},
        {text: 'Actions', filterText: null},
    ]
    const [modalActive, setModalActive] = useState(false)


    useEffect(() => {
        if (!isLoggedIn) {
             navigate('/login')
        };
        isLoggedIn && dispatch(requestCardPack())
    }, [min, max, page, pageCount, packName, userIdForRequest, sortPacks, isLoggedIn])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    // const temporaryOnAdd = () => {
    //     dispatch(addNewPack())
    // }

    const openConfirm = () => {
        setModalActive(true)
    }
    const addNewPackName = (newPack: string) => {
        dispatch(addNewPack(newPack))
        setModalActive(false)
    }
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <div>
                <ModalWindow modalActive={modalActive} setModalActive={setModalActive}>
                    <ModalAddNewPack setModalActive={setModalActive}
                                     title={'Add new pack'}
                                     addNewPack={addNewPackName}

                    />
                </ModalWindow>
            </div>
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
                            onClick={openConfirm}
                        >
                            Add new pack
                        </button>
                    </div>
                    <div className={s.table}>
                        <div className={`${s.header} ${s.packListRow}`}>
                            {packsListHeader.map(({text, filterText}, index) => (
                                <TableHeaderCell key={index}
                                                 text={text}
                                                 filterText={filterText}
                                                 typeTable='packs'/>
                            ))}
                        </div>
                        {dataPacksList.length > 0 &&
                        dataPacksList.map(({
                                               name,
                                               cardsCount,
                                               updated,
                                               user_name,
                                               _id,
                                               user_id
                                           }: PackType, index: number) => (
                            <PackListRow key={_id} data={{
                                name,
                                cardsCount,
                                updated,
                                user_name,
                                _id,
                                user_id
                            }} indexRow={index}
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
        </>

    )
}