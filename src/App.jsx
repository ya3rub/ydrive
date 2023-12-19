import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import AuthLogin from './pages/AuthLogin';
import Signup from './pages/Signup';
import { UserAuthContextProvider } from './context/context';
import ProtectedRoute from './components/ProtectedRoute';
import YDashboard from './pages/YDashboard';

const App = () => {
    return (
        <BrowserRouter>
            <UserAuthContextProvider>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<AuthLogin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/folder/:folderId"
                                element={<YDashboard />}
                            />
                        </Route>
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<YDashboard />} />
                        </Route>
                    </Routes>
                </Layout>
            </UserAuthContextProvider>
        </BrowserRouter>
    );
};

export default App;
