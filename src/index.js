import './global.css';
import './componet';

import Data from '../public/demo.json';
// import Icon from '../assets/icon.svg';
function getComponent() {
    const element = document.createElement('div');
    return import('lodash')
        .then(({ default: _ }) => {
            const element = document.createElement('div');

            element.innerHTML = _.join(['Hello8e', 'manual-hot ffwebpack'], ' ');
            return element;
        })
        .catch(error => 'An error occurred while loading the component');
}
const a = import('./math').then(({ cube }) => {
    return cube(1);
});
const b = import('./math2').then(({ cube }) => {
    return cube(1);
});

console.log(
    'process.env.NODE_ENV',
    process.env.NODE_ENV,
    'a',
    a.then(res => {
        console.log(res);
    }),
    'b',
    b.then(res => {
        console.log(res);
    })
);

getComponent().then(component => {
    document.body.appendChild(component);
});
