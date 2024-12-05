import React from 'react'

const Input = ({ type, names, onChange }) => {
    // console.log(names);

    return (
        <div className="input-group">
            <label htmlFor={names}>{names.charAt(0).toUpperCase() + names.slice(1)}</label>
            <input
                type={type}
                placeholder={`Enter Your ${names}`}
                name={names}
                onChange={onChange}
            />
        </div>
    )
}

export default Input
