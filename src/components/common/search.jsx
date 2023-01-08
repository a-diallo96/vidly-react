import React from 'react';

const Search = ({value, onChange}) => {
    return ( 
        <div className="form-outline">
        <input 
        type="text" 
        name="query" 
        className="form-control my-3"
        placeholder="Search..."
        value={value} 
        onChange={e => onChange(e.currentTarget.value)}/>
         </div>
     );
}
 
export default Search;