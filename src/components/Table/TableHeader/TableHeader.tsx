import React from 'react';
import styles from './TableHeader.module.css';
import {TableModeType} from "../Table";

type TableHeaderType = {
    tableMode: TableModeType
}

function TableHeader(props: TableHeaderType) {
    const packsListHeader = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions'];
    const packsHeader = ['Question', 'Answer', 'Last Updated', 'Grade'];

    return (
        <div className={props.tableMode === 'packsList' ? 'packListRow' : 'packRow'}>
            {
                props.tableMode === "packsList"
                ? packsListHeader.map(cell => <div className='tableCell'>{cell}</div>)
                : packsHeader.map(cell => <div className='tableCell'>{cell}</div>)
            }
        </div>
    );
}

export default TableHeader;