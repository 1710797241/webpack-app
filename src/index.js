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

getComponent().then(component => {
    document.body.appendChild(component);
});
