import { indexOf } from 'lodash';
import { Project, InputProject, ToDo } from './objects';
let projects = [];
let todos = [];

const setProjectsFalse = () => {
    for (let item of projects) {
        item.isActive = false
    }
}
const changeHidden = (...args) => {
    for (let item of args) {
        item.classList.toggle('hidden');
    }
}

const changeBackgroundColor = (project, item) => {
    for (let item of projects) {
        item.div.style.backgroundColor = 'white';
    }
    project.isActive ? item.style.backgroundColor = 'lightgreen' : item.style.backgroundColor = 'white';
}
const setNewIndex = () => {
    let i = 1;
    for (let item of projects) {
        item.div.dataset.index = i
        i++;
    }
}

const init = (() => {
    const expand = document.querySelector('#sidebar');
    const expandNewProject = document.querySelector('main');
    const btnAdd = document.querySelector('#btn-add-project');
    let overlay = document.querySelector('.overlay');
    let project = new Project(expand, 'Default', 'X', 1);
    project.isActive = true;
    projects.push(project);
    changeBackgroundColor(project, project.div);
    let renderInput = new InputProject(expandNewProject, 'Add new project name', 'Add Project', 'Cancel');
    project.expandHtml();


    btnAdd.addEventListener('click', () => {
        renderInput.expandHtml();
        changeHidden(renderInput.aside, overlay);
    })
    renderInput.button2.addEventListener('click', () => {
        changeHidden(renderInput.aside, overlay);
        renderInput.h2.textContent = 'Add new Project name'
        renderInput.input.value = '';
    })
    renderInput.button1.addEventListener('click', () => {
        if (renderInput.input.value === '') {
            renderInput.h2.textContent = 'Please type in a Project name';
        } else {
            let project = new Project(expand, renderInput.input.value, 'X', (projects.length + 1))
            project.expandHtml();
            setProjectsFalse()
            project.isActive = true;
            projects.push(project);
            renderInput.input.value = '';
            changeHidden(renderInput.aside, overlay);
            changeBackgroundColor(project, project.div);
        }
    })
})();

//Click event for projects
const eventsProjects = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target
        while (targetElement != null) {
            //create Project
            if (targetElement.matches('.project')) {
                let currentProject = projects[targetElement.dataset.index - 1]
                setProjectsFalse();
                currentProject.isActive = true;
                changeBackgroundColor(currentProject, currentProject.div)
                return
            }
            //delete Project
            if (targetElement.matches('.delete')) {
                let currentProject = projects[targetElement.parentElement.dataset.index - 1]
                if (currentProject.isActive) {
                    setProjectsFalse()
                    projects[0].isActive = true;
                    changeBackgroundColor(projects[0], projects[0].div);
                }
                if (projects.length <= 1) {
                    setNewIndex();
                    return
                } else {
                    projects.splice([targetElement.parentElement.dataset.index - 1], 1);
                    targetElement.parentElement.remove();
                    setNewIndex();
                }
                return
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}

const sidebar = document.querySelector('#sidebar');
eventsProjects(sidebar, 'click');
//projectsDelete(sidebar, 'click');
//Sidebar and Project UI end --------------------------------

const todoContent = document.querySelector('.content');
const addToDo = document.querySelector('.add-todo');

addToDo.addEventListener('click', () => {
    let projectName = '';
    for (let item of projects) {
        if (item.isActive) {
            projectName = item.div.firstChild.textContent;
        }
    }
    //use Project categories
    if (todos.length < 1) {
        let todo = new ToDo(todoContent, 1);
        todo.expandHtml();
        todos.push(todo);
        todo.todoDiv.dataset.name = projectName;
        todo.todoDiv.style.backgroundColor = 'coral';
    } else {  
        let todo = new ToDo(todoContent, todos.length + 1);
        todo.expandHtml();
        todos.push(todo);
        todo.todoDiv.dataset.name = projectName;
        todo.todoDiv.style.backgroundColor = 'coral';
    }
    //Code to get Project Name and save it as data-attribute
})

const todoSubmit = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.matches('.submit')) {
                //find Current DOM Element in Array
                let currentToDo = todos.find(item => item.todoDiv == targetElement.parentElement); 
                currentToDo.addContent();
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}
todoSubmit(todoContent, 'click');

const todoEdit = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.matches('.edit')) {
                //find Current DOM Element in Array
                let currentToDo = todos.find(item => item.todoDiv == targetElement.parentElement); 
                currentToDo.editTodo();
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}
todoEdit(todoContent, 'click');

const changePriority = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.matches('.todo-priority')) {
                //find Current DOM Element in Array
                let currentToDo = todos.find(item => item.todoDiv == targetElement.parentElement); 
                if(targetElement.children[0].selected) {
                    currentToDo.todoDiv.style.backgroundColor = 'coral';
                }else if (targetElement.children[1].selected) {
                    currentToDo.todoDiv.style.backgroundColor = 'gold';
                }else if (targetElement.children[2].selected) {
                    currentToDo.todoDiv.style.backgroundColor = 'darkseagreen';
                }
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}
changePriority(todoContent, 'change');

const deleteDoto = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;
        while (targetElement != null) {
            if (targetElement.matches('.delete')) {
                //find Current DOM Element in Array
                let currentToDo = todos.find(item => item.todoDiv == targetElement.parentElement); 
                let arrayIndex = todos.indexOf(currentToDo);
                todos.splice(arrayIndex, 1);
                currentToDo.todoDiv.remove();
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}

deleteDoto(todoContent, 'click');

export { init };

