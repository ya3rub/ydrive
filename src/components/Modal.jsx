import React, { useRef } from 'react';

const Modal = ({ show, onClose, children }) => {
    const modRef = useRef();
    if (modRef.current) {
        if (show) {
            modRef.current.showModal();
        } else {
            modRef.current.close();
        }
    }
    return (
        <dialog ref={modRef} className="modal">
            <div className="modal-box pt-10">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    method="dialog"
                >
                    {children}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                            modRef.current.close();
                        }}
                    >
                        ✕
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default Modal;
