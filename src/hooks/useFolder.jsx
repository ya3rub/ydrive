import { useEffect, useReducer } from 'react';
import { db } from '../../firebase';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useUserAuth } from '../context/context';
const ACTIONS = {
    SELECT_FOLDER: 'SELECT_FOLDER',
    SET_CHILD_FOLDERS: 'SET_CHILD_FOLDERS',
    UPDATE_FOLDER: 'UPDATE_FOLDER',
    SET_CHILD_FILES: 'SET_CHILD_FILES',
};
//path: parents
export const ROOT_FOLDER = { name: 'Root', id: null, path: [] };

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFolders: payload.childFolders || [], // Update childFolders
                childFiles: payload.childFiles || [], // Update childFiles
            };
        case ACTIONS.UPDATE_FOLDER:
            return { ...state, folder: payload.folder };
        case ACTIONS.SET_CHILD_FOLDERS:
            return { ...state, childFolders: payload.childFolders };
        case ACTIONS.SET_CHILD_FILES:
            return { ...state, childFiles: payload.childFiles };
        default:
            return state;
    }
}

//use null instead of undefied
const useFolder = (folderId = null, folder = null) => {
    //
    //{folderId,folder} : default state (folderId, folder Obj)
    const { user: currentUser } = useUserAuth();
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });
    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: { folderId, folder },
        });
    }, [folderId, folder]);
    //Order Matters,this useEffect should come second !!!!
    const getFolder = async () => {
        try {
            const folder = await db.getDocById(db.foldersStr, folderId);
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: folder },
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            });
        }
    };

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            });
        }
        getFolder();
    }, [folderId]);

    useEffect(() => {
        const q = query(
            db.folders,
            where('parentId', '==', folderId),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: {
                        childFolders: snapshot.docs.map(db.formatDoc),
                    },
                });
            },
            (e) => {
                console.error(e);
            }
        );

        return () => unsubscribe();
    }, [folderId, currentUser]);

    useEffect(() => {
        const q = query(
            db.files,
            where('folderId', '==', folderId),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: {
                    childFiles: snapshot.docs.map(db.formatDoc),
                },
            });
        });

        return () => unsubscribe();
    }, [folderId, currentUser]);

    return state;
};

export default useFolder;
