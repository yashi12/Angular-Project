import _ from 'lodash';
import './hello.css';
import Icon from '../images/images.jpg';
export default function printMe() {
    console.log('I get called from print.js!');
}
console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);

export const myIcon = new Image();
myIcon.src = Icon;
