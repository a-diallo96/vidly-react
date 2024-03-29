import React from 'react';



const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group">
            {items.map(item => (
                <li  
                key={item[valueProperty]} 
                onClick={() => onItemSelect(item)} 
                className={item===selectedItem?"list-group-item active":"list-group-item"}><a>{item[textProperty]}</a></li>

            ))}
        </ul>
    );
};

ListGroup.defaultProps = {
    valueProperty: "_id",
    textProperty: "name"
}

export default ListGroup;