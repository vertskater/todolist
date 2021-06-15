'use strict'
import { fromPairs } from 'lodash';
import './main.min.css';
import { init, projects, todos } from './modules/dommanipulation';


//Helper Functions
function setProjectsFalse() {
    for (let item of projects) {
        item.isActive = false
    }
}
function changeHidden(...args) {
    for (let item of args) {
        item.classList.toggle('hidden');
    }
}

function changeBackgroundColor(project, item) {
    for (let item of projects) {
        item.div.style.backgroundColor = 'white';
    }
    project.isActive ? item.style.backgroundColor = 'lightgreen' : item.style.backgroundColor = 'white';
}
function setNewIndex() {
    let i = 1;
    for (let item of projects) {
        item.div.dataset.index = i
        i++;
    }
}

const todoContent = document.querySelector('.content');

const loadTodos = (projectName) => {
    for (let item of todos) {
        console.log(item.todoDiv.dataset.name, projectName);
        if (item.todoDiv.dataset.name == projectName) {
            todoContent.appendChild(item.todoDiv);
        }
    }
}

const deleteTodosinProject = (projectName) => {
    for(let i = (todos.length -1); i >= 0; i--){
        console.log(i);
        if (todos[i].todoDiv.dataset.name === projectName) {
            let index = todos.indexOf(todos[i]);
            todos.splice(index, 1)
            //todos.todoDiv.remove();
        }
    }
}

function switchingProjects(targetElement) {
    let currentProject = projects.find(item => item.div == targetElement);
    setProjectsFalse();
    currentProject.isActive = true;
    changeBackgroundColor(currentProject, currentProject.div);
    if (todos.length > 0) {
        loadTodos(currentProject.div.firstChild.textContent);
    }
}


// window.addEventListener('click', () => {
//       console.log(todos, projects);
//   })
export { deleteTodosinProject, loadTodos, changeHidden, changeBackgroundColor, setNewIndex, setProjectsFalse, switchingProjects };

