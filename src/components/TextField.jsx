import React from 'react';

const TextField = ({ labelText, rq, value, placeholder, onChange }) => {
    return (
        <label className="my-4 form-control w-full text-gray-300">
            <span className="label-text mb-2">{labelText}</span>
            <input
                type="text"
                required={rq}
                value={value}
                placeholder={placeholder}
                className="input input-bordered w-full "
                onChange={onChange}
            />
        </label>
    );
};

export default TextField;
