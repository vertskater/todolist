
import { deleteTodosinProject, loadTodos, changeHidden, changeBackgroundColor, setProjectsFalse, switchingProjects, dontShowTodos } from '../index';
import { Project, InputProject, ToDo } from './objects';


let projects = [];
let todos = [];

const init = (() => {
    //init DOM Elements and create first Project Object
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
    //Add Events
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
            if (targetElement.matches('.project')) {
                switchingProjects(targetElement)
                dontShowTodos();
                loadTodos(targetElement.firstChild.textContent);
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}

const eventDeleteProject = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target
        while (targetElement != null) {
            if (targetElement.matches('.delete')) {
                let currentProject = projects.find(item => item.div.firstChild.textContent == targetElement.parentElement.firstChild.textContent);
                if (currentProject.div.firstChild.textContent != 'Default') {
                    deleteTodosinProject(currentProject.div.firstChild.textContent);
                    let index = projects.indexOf(currentProject);
                    projects[0].isActive = true;
                    changeBackgroundColor(projects[0], projects[0].div);
                    projects.splice(index, 1);
                    currentProject.div.remove();
                    dontShowTodos();
                    loadTodos(projects[0].div.firstChild.textContent);
                }
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}
const sidebar = document.querySelector('#sidebar');
eventsProjects(sidebar, 'click');
eventDeleteProject(sidebar, 'click')
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
//local Storage

export { init, projects, todos };






