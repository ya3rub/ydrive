import React from 'react';

const FileInput = ({ onChange }) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">Pick a file</span>
            </div>
            <input
                type="file"
                className="file-input file-input-bordered w-full "
                onChange={onChange}
            />
        </label>
    );
};

export default FileInput;
