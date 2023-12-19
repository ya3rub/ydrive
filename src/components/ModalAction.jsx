import React from 'react';

const ModalAction = ({ children }) => {
    return (
        <div className=" flex-col">
            <div className="divider m-1"></div>
            <div className="modal-action  mt-1">{children}</div>
        </div>
    );
};

export default ModalAction;
