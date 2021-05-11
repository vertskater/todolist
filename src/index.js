'use strict'
import './main.min.css';
import {ToDo} from './modules/objects';
import {addProject} from './modules/dommanipulation';



//testing
let del = document.querySelector('.delete');
del.addEventListener('click', () =>{
    console.log('hello');
})

let project = ToDo('Test', 'Test description', new Date(2021, 4, 11), 'hight');
console.log(project.getDate());


