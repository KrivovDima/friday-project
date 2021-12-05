import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import s from './CardsList.module.css'
import {AppRootStateType} from '../../store/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {
    requestCards, setCardsPage, setCardsPageCount,
    setSearchPacksName
} from '../../store/cardPacksReducer';
import {SearchInput} from '../SearchInput/SearchInput';
import {Paginator} from '../Paginator/Paginator';
import Preloader from '../Preloader/Preloader';
import PackRow, {PackRowDataType} from './PackRow';
import {TableHeaderCell} from "../TableHeaderCell/TableHeaderCell";


export const CardsList = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLoggedIn)
    const appStatus = useSelector((state: AppRootStateType) => state.app.status)
    const page = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.page)
    const currentPackName = useSelector((state: AppRootStateType) => state.cardPacks.currentPackName)
    const pageCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.pageCount)
    const totalCount = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.cardsTotalCount)
    const dataCardsList = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.cards);
    const currentPackId = useSelector((state: AppRootStateType) => state.cardPacks.currentCardsPackId);
    const sortCards = useSelector((state: AppRootStateType) => state.cardPacks.currentCards.sortCards);

    const packsCardsHeader = [
        {text: 'Question', filterText: 'question'},
        {text: 'Answer', filterText: 'answer'},
        {text: 'Last Updated', filterText: 'updated'},
        {text: 'Grade', filterText: 'grade'},
        {text: 'Actions', filterText: null},
    ];

    const navigate = useNavigate()

    useEffect(() => {
        isLoggedIn && dispatch(requestCards())
    }, [page, pageCount, currentPackId, sortCards])

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
                <div className={s.titleWrapper}>
                    <div className={s.arrow}
                        onClick={() => {

                            navigate('/packsList')
                        }}>
                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="#2D2E46" stroke-width="2"/>
                    </svg>
                    </div>
                    <div className={s.title}>{currentPackName}</div>
                </div>
                <div className={s.inputWrapper}>
                    <SearchInput
                        setSearch={setSearchPacksName}
                        disabled={appStatus === 'loading'}/>
                </div>

                <div className={s.table}>
                    <div className={`${s.tableHeader} ${s.packRow}`}>
                        {packsCardsHeader.map(({text, filterText}, index) => (
                            <TableHeaderCell key={index} text={text} filterText={filterText} typeTable='cards'/>
                        ))}
                    </div>
                    {dataCardsList && dataCardsList.map(
                        ({answer, question, grade, updated, _id, user_id}: PackRowDataType, index: number) =>
                            (<PackRow key={_id} data={{answer, question, grade, updated, _id, user_id}} indexRow={index}/>))}
                </div>
                <Paginator
                    page={page}
                    pageCount={pageCount}
                    totalCount={totalCount}
                    setPageAction={setCardsPage}
                    setPageCountAction={setCardsPageCount}
                    disabled={appStatus === 'loading'}/>
            </div>
        </div>
    )
}