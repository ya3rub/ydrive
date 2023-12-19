import React, { useState } from 'react';
import Modal from './Modal';
import ModalAction from './ModalAction';
import TextField from './TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserAuth } from '../context/context';
import { ROOT_FOLDER } from '../hooks/useFolder';
const AddFolderButton = ({ currentFolder }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const { user } = useUserAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentFolder == null) {
            setShow(false);
            return;
        }
        const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id });
        }
        try {
            await addDoc(db.folders, {
                name,
                parentId: currentFolder.id,
                userId: user.uid,
                path: path,
                createdAt: db.getCurrentTimestamp(),
            });
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    };
    const openModal = () => {
        setShow(true);
    };
    const closeModal = () => {
        setShow(false);
    };

    return (
        <>
            <Modal id={'folder'} show={show} onClose={closeModal}>
                <div className="flex flex-col justify-between">
                    <TextField
                        labelText="Folder Name"
                        rq
                        value={name}
                        placeholder="Book Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <ModalAction>
                    <button className="btn" type="button" onClick={closeModal}>
                        Close
                    </button>
                    <button
                        className="btn btn-accent"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </ModalAction>
            </Modal>
            <button
                type="button"
                className="btn btn-outline btn-accent"
                onClick={openModal}
            >
                <FontAwesomeIcon icon={faFolderPlus} />
            </button>
        </>
    );
};

export default AddFolderButton;
