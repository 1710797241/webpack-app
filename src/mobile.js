import './global.css';
import qs from 'qs';
import Data from '../public/demo.json';
import Icon from '../assets/icon.svg';
function component() {
    const element = document.createElement('div');
    return import('lodash')
        .then(({ default: _ }) => {
            const element = document.createElement('div');

            element.innerHTML = _.join(['Hello', 'webpack'], ' ');
            return element;
        })
        .catch(error => 'An error occurred while loading the component');
}
console.log('compfvvfonffffenfft');

getComponent().then(component => {
    document.body.appendChild(component);
});
