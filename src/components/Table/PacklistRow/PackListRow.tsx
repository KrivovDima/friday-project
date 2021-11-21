import React from 'react';

export type PackListRowDataType = {
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

type PackListRowPropsType = {
    data: PackListRowDataType
    indexRow: number
}

function PackListRow(props: PackListRowPropsType) {
    const {
        name,
        cardsCount,
        updated,
        user_name,
    } = props.data

    return (
        <div className={`packListRow ${props.indexRow % 2 !== 0 && 'segregateRow'}`}>
            <div>{name}</div>
            <div>{cardsCount}</div>
            <div>{updated}</div>
            <div>{user_name}</div>
            <div>
                <button>Delete</button>
                <button>Edit</button>
                <button>Learn</button>
            </div>
        </div>
    );
}

export default PackListRow;