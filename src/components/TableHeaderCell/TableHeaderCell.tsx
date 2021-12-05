import React, {useState} from 'react';

import styles from './TableHeaderCell.module.css'
import {useDispatch} from "react-redux";
import {setSortPacks} from "../../store/cardPacksReducer";

import arrowIcon from '../../img/sort-arrow.svg'
import {helperSetFilter} from "../../utils/helperSetFilter";

type TableHeaderCellPropsType = {
    text: string
    filterText: string | null
    typeTable: 'packs' | 'cards'
}

export const TableHeaderCell: React.FC<TableHeaderCellPropsType> = (props) => {
    const {text, filterText, typeTable} = props

    const initialStateFilter = filterText === 'updated' ? '0' : null
    const [filter, setFilter] = useState(initialStateFilter)

    const dispatch = useDispatch()

    const handleOnClick = () => {
        if (!filterText) {
            return
        }

        switch (filter) {
            case null: {
                helperSetFilter('0', setFilter, typeTable, dispatch, filterText)
                break
            }
            case '0': {
                helperSetFilter('1', setFilter, typeTable, dispatch, filterText)
                break
            }
            case '1': {
                helperSetFilter(null, setFilter, typeTable, dispatch, filterText)
                break
            }


        }
    }

    return (
        <div className={styles.container}>
            <span onClick={handleOnClick}
                  className={filterText ? `${styles.text} ${styles.pointer}` : `${styles.text}`}>
                {text}
            </span>
            <img className={
                `
                ${filter === null && styles.hidden} 
                ${filter === '0' && ''} 
                ${filter === '1' && styles.arrowUp}
                `
            }
                 src={arrowIcon} alt="sortArrow"/>
        </div>
    );
};

