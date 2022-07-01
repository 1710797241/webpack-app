import './global.css';
import './componet';
import React from 'react';
import { createRoot } from 'react-dom/client';
const Demo = () => {
    return <div>react-mobile</div>;
};

const root = createRoot(document.getElementById('root'));
root.render(<Demo />);
