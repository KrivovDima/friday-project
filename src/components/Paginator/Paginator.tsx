import React, {ChangeEvent, useEffect, useState} from 'react'
import s from './Paginator.module.css';
import {useDispatch} from 'react-redux';
import {setCardsPage, setCardsPageCount, setPacksPage, setPacksPageCount} from '../../store/cardPacksReducer';


type PaginatorPropsType = {
    page: number
    pageCount: number
    totalCount: number
    setPageAction: typeof setPacksPage | typeof setCardsPage
    setPageCountAction: typeof setPacksPageCount | typeof setCardsPageCount
    disabled: boolean
}

export const Paginator = (props: PaginatorPropsType) => {

    const dispatch = useDispatch()

    const portionSize: number = 5

    const [portionNumber, setPortionNumber] = useState<number>(Math.ceil(props.page / portionSize))


    let allPagesCount = Math.ceil(props.totalCount / props.pageCount);
    let pages: number[] = [];
    for (let i = 1; i <= allPagesCount; i++) {
        pages.push(i)
    }
    let firstPage = pages[0];
    let lastPage = pages[pages.length - 1]
    let portionsCount = Math.ceil(allPagesCount / portionSize)
    let leftBorder = portionSize * (portionNumber - 1) + 1;
    let rightBorder = portionNumber * portionSize;

    return (
        <div className={props.disabled ?  `${s.paginatorWrapper} ${s.disabledButton}` : s.paginatorWrapper}>

            <div className={s.pagesBar}>
                <div
                    onClick={() => {
                        setPortionNumber(portionNumber - 1)
                    }}
                    className={`${s.arrow} ${s.arrow_left} ${portionNumber === leftBorder ? s.disabledButton : ''}`}/>
                {portionNumber < portionsCount
                    ?
                    <div className={s.pages}>
                        {pages
                            .filter(p => p >= leftBorder && p <= rightBorder)
                            .map(p => <div
                                key={p}
                                className={(props.page === p) ? `${s.page} ${s.selectedPage}` : s.page}
                                onClick={() => {
                                    dispatch(props.setPageAction({page: p}))
                                }}>{p}</div>)}
                        <div className={s.page} style={{cursor: 'default'}}>...</div>
                        <div className={s.page}
                             onClick={() => {
                                 dispatch(props.setPageAction({page: lastPage}))
                             }}>{lastPage}</div>
                    </div>
                    :
                    <div className={s.pages}>
                        <div className={s.page}
                             onClick={() => {
                                 dispatch(props.setPageAction({page: firstPage}))
                             }}>{firstPage}
                        </div>
                        <div className={s.page} style={{cursor: 'default'}}>...</div>
                        {pages
                            .filter(p => p >= leftBorder && p <= rightBorder)
                            .map(p => <div
                                key={p}
                                className={(props.page === p) ? `${s.page} ${s.selectedPage}` : s.page}
                                onClick={() => {
                                    dispatch(props.setPageAction({page: p}))
                                }}>{p}</div>)}
                    </div>
                }
                <div
                    onClick={() => {
                        setPortionNumber(portionNumber + 1)
                    }}
                    className={`${s.arrow} ${s.arrow_right} ${portionNumber === portionsCount ? s.disabledButton : ''}`}
                />
            </div>
            <div className={s.portionWrapper}>
                Show
                <select
                    value={props.pageCount}
                    className={s.customSelect}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        dispatch(props.setPageCountAction({pageCount: +e.currentTarget.value}))
                    }}>
                    <option value={4}>4</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>
                Cards per Page
            </div>
        </div>


    )
}

