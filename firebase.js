import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    serverTimestamp,
} from 'firebase/firestore';
// Your web app's Firebase configuration
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
    /*ADD YOUR CREDTS HERE !*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);
export const storage = getStorage(app);
export const db = {
    foldersStr: 'folders',
    filesStr: 'files',
    folders: collection(store, 'folders'),
    files: collection(store, 'files'),
    getCurrentTimestamp: serverTimestamp,
    getDocById: async (colStr, id) => {
        const docRef = db.getDocRef(colStr, id);
        const colDoc = await getDoc(docRef);
        return db.formatDoc(colDoc);
    },
    getDocRef: (CollectionStr, docId) => {
        return doc(store, CollectionStr, docId);
    },
    formatDoc: (doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    },
};
