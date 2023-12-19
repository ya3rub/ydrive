import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Folder = ({ folder }) => {
    return (
        <NavLink
            to={`/folder/${folder.id}`}
            state={{ folder: folder }}
            className="btn btn-outline truncate  w-42"
        >
            <FontAwesomeIcon icon={faFolder} />
            {folder?.name}
        </NavLink>
    );
};

export default Folder;
