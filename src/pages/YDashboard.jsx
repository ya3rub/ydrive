import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AddFolderButton from '../components/AddFolderButton';
import useFolder from '../hooks/useFolder';
import Folder from '../components/Folder';
import FolderBreadcrumbs from '../components/FolderBreadcrumbs';
import AddFileButton from '../components/AddFileButton';
import File from '../components/File';
const YDashboard = () => {
    const { folderId } = useParams();
    const { state = {} } = useLocation();
    const { folder, childFolders, childFiles } = useFolder(
        folderId,
        state ? state.folder : null
    );

    return (
        <div className="felx flex-col space-y-4 flex-1">
            <div className="flex justify-between items-center space-x-6">
                <FolderBreadcrumbs currentFolder={folder} />
                <div className="flex space-x-4">
                    <AddFolderButton currentFolder={folder} />
                    <AddFileButton currentFolder={folder} />
                </div>
            </div>
            <div className="">
                {childFolders?.length > 0 && (
                    <div className="flex flex-wrap">
                        {childFolders.map((childFolder) => (
                            <div key={childFolder.id} className="p-2 max-w-xs">
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
                {childFiles?.length > 0 && (
                    <div className="flex flex-wrap">
                        {childFiles.map((childFile) => (
                            <div key={childFile.id} className="p-2 max-w-xs">
                                <File file={childFile} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default YDashboard;
