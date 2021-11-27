import React from 'react';
import {TableModeType} from "../Table";
import styles from './TableHeader.module.css'

type TableHeaderType = {
    tableMode: boolean
}

function TableHeader(props: TableHeaderType) {
    const packsListHeader = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions'];
    const packsHeader = ['Question', 'Answer', 'Last Updated', 'Grade'];

    return (
        <div className={`${styles.header} ${props.tableMode ? 'packListRow' : 'packRow'}`}>
            {
                props.tableMode
                ? packsListHeader.map((cell, index) => <div key={index} className='tableCell'>{cell}</div>)
                : packsHeader.map((cell, index) => <div key={index} className='tableCell'>{cell}</div>)
            }
        </div>
    );
}

export default TableHeader;