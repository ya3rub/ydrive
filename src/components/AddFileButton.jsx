import React, { useState } from 'react';
import FileInput from './FileInput';
import Modal from './Modal';
import ModalAction from './ModalAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {
    addDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import { v4 } from 'uuid';
import { createPortal } from 'react-dom';
import { useUserAuth } from '../context/context';
import { db, storage, store } from '../../firebase';
import { ROOT_FOLDER } from '../hooks/useFolder';
const AddFileButton = ({ currentFolder }) => {
    const [show, setShow] = useState(false);
    const [toastIsShown, setToastIsShown] = useState(false);

    const [fileUpload, setFileUpload] = useState(null);
    const [uploadingFiles, setUploadingFiles] = useState([]);

    const { user } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadFile();
    };

    const uploadFile = async () => {
        if (!fileUpload) return;
        const id = v4();

        setUploadingFiles((prev) => [
            ...prev,
            {
                id: id,
                name: fileUpload.name,
                progress: 0,
                error: false,
            },
        ]);

        const parentPath =
            currentFolder.path.length > 0
                ? `${currentFolder.path.map((folder) => folder.name).join('/')}`
                : '';

        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${parentPath}/${fileUpload.name}`
                : `${parentPath}/${currentFolder.name}/${fileUpload.name}`;

        const filesFolderRef = ref(storage, `/files/${user.uid}/${filePath}`);

        uploadBytesResumable(filesFolderRef, fileUpload).on(
            'state_changed',
            (snp) => {
                setToastIsShown(true);
                const progress = snp.bytesTransferred / snp.totalBytes;
                setUploadingFiles((prev) => {
                    return prev.map((uploadedFile) => {
                        if (uploadedFile.id === id) {
                            return { ...uploadedFile, progress: progress };
                        }
                        return uploadedFile;
                    });
                });
            },
            (e) => {
                setUploadingFiles((prev) => {
                    return prev.map((uploadedFile) => {
                        if (uploadedFile.id === id) {
                            return { ...uploadedFile, error: true };
                        }
                        return uploadedFile;
                    });
                });
                console.log(e);
                closeModal();
            },
            async () => {
                setUploadingFiles((prev) => {
                    return prev.filter((f) => f.id !== id);
                });
                //
                //check for existing files
                const q = query(
                    db.files,
                    where('name', '==', fileUpload.name),
                    where('userId', '==', user.uid),
                    where('folderId', '==', currentFolder.id)
                );
                const qSnapshot = await getDocs(q);

                const existingFile = qSnapshot.docs[0];
                if (existingFile) {
                    const bDoc = doc(store, db.filesStr, existingFile.id);
                    try {
                        const url = await getDownloadURL(filesFolderRef);
                        await updateDoc(bDoc, { url: url });
                    } catch (e) {
                        console.error(e);
                    }
                    closeModal();
                    return;
                }

                const url = await getDownloadURL(filesFolderRef);
                await addDoc(db.files, {
                    name: fileUpload.name,
                    createdAt: db.getCurrentTimestamp(),
                    userId: user.uid,
                    url: url,
                    folderId: currentFolder.id,
                });
                closeModal();
            }
        );
    };

    const openModal = () => {
        setShow(true);
    };
    const closeModal = () => {
        setShow(false);
    };
    return (
        <>
            <Modal show={show} onClose={closeModal}>
                <div className="flex flex-col justify-between">
                    <FileInput
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (currentFolder == null || file == null) return;
                            setFileUpload(file);
                        }}
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
                        Add File
                    </button>
                </ModalAction>
            </Modal>
            <button
                type="button"
                className="btn btn-outline btn-accent"
                onClick={openModal}
            >
                <FontAwesomeIcon icon={faFile} />
            </button>
            {uploadingFiles.length > 0 &&
                createPortal(
                    <div className="absolute bottom-4 right-4 max-w-xs">
                        {uploadingFiles.map((file) => {
                            return (
                                <div
                                    key={file.id}
                                    className={`toast toast-end ${
                                        toastIsShown ? '' : 'hidden'
                                    }`}
                                >
                                    {file.progress * 100 >= 100 ? (
                                        <div
                                            className={`alert alert-success flex flex-col justify-start items-start`}
                                        >
                                            <span className="text-gray-600 truncate w-56">
                                                Done !
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            className={`alert alert-warning flex flex-col justify-start items-start`}
                                        >
                                            <span className="text-gray-600 truncate">
                                                Uploading... {file.name}
                                            </span>
                                            <progress
                                                className="h-4 progress progress-success w-56 transition-all"
                                                value={file.progress * 100}
                                                max="100"
                                            ></progress>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>,
                    document.body
                )}
        </>
    );
};

export default AddFileButton;
