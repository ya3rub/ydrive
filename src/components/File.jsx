import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const File = ({ file }) => {
    return (
        <NavLink to={`${file.url}`} className="btn btn-outline truncate  w-42">
            <FontAwesomeIcon icon={faFile} />
            {file?.name}
        </NavLink>
    );
};

export default File;
