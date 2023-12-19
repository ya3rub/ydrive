import React from 'react';
import NavigationBar from '../components/NavigationBar';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col space-y-8 ">
            <NavigationBar />
            <div id="app-layout" className="mx-10 " tabIndex={0}>
                <div className="flex justify-center ">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
