import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROOT_FOLDER } from '../hooks/useFolder';

const FolderBreadcrumbs = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, currentFolder.path];
    return (
        <div className="text-md breadcrumbs">
            <ul>
                {currentFolder !== ROOT_FOLDER && (
                    <li>
                        <NavLink
                            to="/"
                            className="text-gray-100 bg-transparent"
                        >
                            Root
                        </NavLink>
                    </li>
                )}
                {currentFolder &&
                    currentFolder.path?.map((folder, i) => {
                        console.log(folder);
                        if (i == currentFolder.path.length) {
                            return;
                        }

                        return (
                            <li key={i}>
                                <NavLink
                                    className="text-gray-100 bg-transparent"
                                    to={'/folder/' + folder.id}
                                    state={{
                                        folder: {
                                            ...folder,
                                            path: path.slice(1, i),
                                        },
                                    }}
                                >
                                    {folder?.name}
                                </NavLink>
                            </li>
                        );
                    })}
                <li>
                    {currentFolder && currentFolder?.name !== 'Root' && (
                        <span>{currentFolder.name}</span>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default FolderBreadcrumbs;
