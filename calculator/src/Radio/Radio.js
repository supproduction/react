import React from 'react';

export default ({checked, val, name, id, onChange, children}) => {
  return (
    <div>
      <input className="current_"
             type="radio"
             checked={checked === val}
             name={name}
             value={val}
             id={id}
             onChange={(e) => onChange(e.target.value)}

      />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}