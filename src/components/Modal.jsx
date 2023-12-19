import React from 'react';

const Modal = ({ show, onClose, children, id }) => {
    const m = document.getElementById(id);
    if (show) {
        if (m) {
            m.showModal();
        }
    } else {
        if (m) {
            m.close();
        }
    }
    return (
        <dialog id={id} className="modal">
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
                            if (m) {
                                m.close();
                            }
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
