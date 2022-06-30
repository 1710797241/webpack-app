import _ from 'lodash';
import qs from 'qs';
import './global.css';
import Data from '../public/demo.json';
import Icon from '../assets/icon.svg';
function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello html', 'webpack----------'], '<div>888</div> ');

    return element;
}

document.body.appendChild(component());
