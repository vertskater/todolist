'use strict'
import {Project} from './objects';
import {findProjectName} from './functions';
/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Code to add new Projects and create the html-code
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
let allProjects = Project();

function showAndHide(...elements) {
    for (let element of elements) {
        element.classList.toggle('hidden');
    }
}

const renderProjectInput = (btn) => {
    const inputName = document.querySelector('.type-project-name');
    const overlay = document.querySelector('.overlay');
    const btnCancel = document.querySelector('#btn-cancel-project');
    const btnAddProject = document.querySelector('#btn-project-name');
    btn.addEventListener('click', () => {
        showAndHide(inputName, overlay);
    })
    btnCancel.addEventListener('click', () => {
        showAndHide(inputName, overlay);
    })
    return btnAddProject;
}

const getProjectName = (projectName) => {
    const input = document.querySelector('#project-name');
    const heading = document.querySelector('.overlay-title');
    const inputName = document.querySelector('.type-project-name');
    const overlay = document.querySelector('.overlay');
    if (input.value == '') {
        heading.textContent = 'Please fill in a project name';
    } else {
        showAndHide(inputName, overlay);
        heading.textContent = 'Add new Project name';
        projectName = input.value;
        input.value = '';
        return projectName;
    }
}

const renderHTML = (expand, html, text, addClass) => {
    let element = document.createElement(html);
    if (addClass != undefined) { element.classList.add(addClass) };
    if (text != undefined) { element.textContent = text };
    expand.appendChild(element);
}

//Starting function written in modules pattern
const addProject = () => {
    let htmlElements = ['div', 'em']; //must be oursourced
    const sidebar = document.querySelector('#sidebar');
    const btnAddProject = document.querySelector('#btn-add-project') //maby outsourced
    let btnAdd = renderProjectInput(btnAddProject);
    let projectName = '';
    //Add Project to html and change Project Object.
    btnAdd.addEventListener('click', () => {
        allProjects.deleteProjects();
        projectName = getProjectName(projectName);
        renderHTML(sidebar, htmlElements[0], projectName, 'project');
        let projects = document.querySelectorAll('.project');
        for (let project of projects) {
            allProjects.addProjects(project);
            if(project.children.length == 0){
                renderHTML(project, htmlElements[1], 'X', 'delete');
            };
        }
        findProjectName();
    })
};


export { addProject, allProjects };