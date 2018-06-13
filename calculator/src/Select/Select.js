import React from 'react';

export default ({label,value,onChange,id, children}) => {
  return (
    <label>{label}
      <select value={value} onChange={onChange} id={id}>
        {children}
      </select>
    </label>
  )
}