import React from 'react';
import TableBody from './tableBody.jsx';
import TableHeader from './tableHeader.jsx';

const Table = ({columns, sortColumn, onSort, data}) => {
    return (  
        <table className="table ">
            <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort}/>
            <TableBody data={data} columns={columns} />
        </table> );
}
 
export default Table;