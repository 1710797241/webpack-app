import './global.css';
import styles from './global.css';
import './componet';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import loadable from '@loadable/component';
const PageA = loadable(() => import('./pageA'));

const Demo = props => {
    const navgate = useNavigate();
    return (
        <div className="text-blue-600">
            react
            <button
                onClick={() => {
                    navgate('/PageA');
                }}
            >
                push
            </button>
        </div>
    );
};

const Layout = () => {
    return (
        <div>
            <div>
                <h1 className={styles['header-1']}>header</h1>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};
const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Demo />} />
                <Route path="PageA" element={<PageA />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: '1rem' }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>
);
