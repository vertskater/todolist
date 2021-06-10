
import { indexOf } from 'lodash';
import { deleteTodosinProject, loadTodos, changeHidden, changeBackgroundColor, setNewIndex, setProjectsFalse, switchingProjects } from '../index';
import { Project, InputProject, ToDo } from './objects';
let projects = [];
let todos = [];



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
        renderInput.h2.textContent = 'Add new Project name';
        renderInput.input.value = '';
    })
    renderInput.button1.addEventListener('click', () => {
        if (renderInput.input.value === '') {
            renderInput.h2.textContent = 'Please type in a Project name';
            console.log(projects.some(item => item.div.firstChild.textContent === 'Default'));
        } else if (projects.some(item => item.div.firstChild.textContent === renderInput.input.value)) {
            renderInput.h2.textContent = 'Projectname is already in use';
        } else {
            let project = new Project(expand, renderInput.input.value, 'X', (projects.length + 1))
            project.expandHtml();
            setProjectsFalse()
            project.isActive = true;
            projects.push(project);
            renderInput.input.value = '';
            renderInput.h2.textContent = 'Add new Project name';
            changeHidden(renderInput.aside, overlay);
            changeBackgroundColor(project, project.div);
            dontShowTodos();
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
                switchingProjects(targetElement)
                dontShowTodos();
                loadTodos(targetElement.firstChild.textContent);
                /*
                let currentProject = projects[targetElement.dataset.index - 1]
                setProjectsFalse();
                currentProject.isActive = true;
                changeBackgroundColor(currentProject, currentProject.div)
                loadTodos(currentProject.div.firstChild.textContent);
                return
                */
            }
            //delete Project
            /*if (targetElement.matches('.delete')) {
                let currentProject = projects[targetElement.parentElement.dataset.index - 1]
                if (currentProject.isActive) {
                    setProjectsFalse();
                    projects[0].isActive = true;
                    changeBackgroundColor(projects[0], projects[0].div);
                    loadTodos(currentProject.div.firstChild.textContent)
                }
                if (projects.length <= 1) {
                    setNewIndex();
                    return
                } else {
                    projects.splice([targetElement.parentElement.dataset.index - 1], 1);
                    targetElement.parentElement.remove();
                    setNewIndex();
                    loadTodos(currentProject.div.firstChild.textContent);
                }
                dontShowTodos()
                deleteTodosinProject(currentProject.div.firstChild.textContent);
                return
            }*/ //TODO: Todos must be deleted form the todos Array when an Object is going to be deleted.
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
                if (targetElement.children[0].selected) {
                    currentToDo.todoDiv.style.backgroundColor = 'coral';
                } else if (targetElement.children[1].selected) {
                    currentToDo.todoDiv.style.backgroundColor = 'gold';
                } else if (targetElement.children[2].selected) {
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

//Switching Projects and load Todos

const dontShowTodos = () => {
    let todosHTML = document.querySelectorAll('.todo');
    for (let item of todosHTML) {
        item.remove();
    }
}


// const switchingProjects = (rootElement, event) => {
//     rootElement.addEventListener(event, (e) => {
//         let targetElement = e.target;
//         while (targetElement != null) {
//             if (targetElement.matches('.project')) {

//             }
//             targetElement = targetElement.parentElement;
//         }
//     }, true)
// }


//switchingProjects(sidebar, 'click')

export { init, projects, todos };






