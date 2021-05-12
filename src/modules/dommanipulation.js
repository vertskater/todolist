'use strict'

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Code to add new Projects and create the html-code
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/


function showAndHide(...elements) {
    for (let element of elements) {
        element.classList.toggle('hidden');
    }
}

const showProjectInput = (btn) => {
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

const addProject = (() => {
    let htmlElements = ['div', 'em']; //must be oursourced
    const sidebar = document.querySelector('#sidebar');
    const btnAddProject = document.querySelector('#btn-add-project') //maby outsourced
    let btnAdd = showProjectInput(btnAddProject);
    let projectName = '';
    btnAdd.addEventListener('click', () => {
        projectName = getProjectName(projectName);
        createHTML(sidebar, htmlElements[0], projectName, 'project');
        let projects = document.querySelectorAll('.project');
        for (let project of projects) {
            if(project.children.length == 0){
                createHTML(project, htmlElements[1], 'X', 'delete');
            };
        }
    })
})();

const createHTML = (expand, html, text, addClass) => {
    let element = document.createElement(html);
    if (addClass != undefined) { element.classList.add(addClass) };
    if (text != undefined) { element.textContent = text };
    expand.appendChild(element);
}

export { addProject };