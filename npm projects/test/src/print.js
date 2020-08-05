import _ from 'lodash';
import './hello.css';
export default function printMe() {
    console.log('I get called from print.js!');
}
console.log(
    _.join(['Another', 'module', 'loaded!'], ' ')
);