'use strict'

const createHTML = (name) => {
    console.log(name);
}

function showAndHide(...elements){
    for(let element of elements){
        element.classList.toggle('hidden');
    }
}

const showProjectInput = (btn) => {
    const inputName = document.querySelector('.type-project-name');
    const overlay = document.querySelector('.overlay');
    const btnCancel = document.querySelector('#btn-cancel-project');
    const btnAddProject = document.querySelector('#btn-project-name');
    const projectName = document.querySelector('input[type="text"]');
    const projectHeading = document.querySelector('.overlay-title');
    btn.addEventListener('click', () => {
        showAndHide(inputName, overlay);
    })
    btnCancel.addEventListener('click', () => {
        showAndHide(inputName, overlay);
    })
    btnAddProject.addEventListener('click', () => {
        if(projectName.value == '') {
            projectHeading.textContent = 'Bitte geben Sie einen Text ein!'
        } else {
            showAndHide(inputName, overlay);
            createHTML(projectName.value);      
        }
    })
}


const addProject = (() => {
    let htmlElements = ['div', 'em'];
    let html = [];
    const btnAddProject = document.querySelector('#btn-add-project')
    showProjectInput(btnAddProject);
    btnAddProject.addEventListener('click', () => {
        while (html.length < htmlElements.length) {
            for (let element of htmlElements) {
                html.push(document.createElement(element));
            }
        }
    })
})();

export { addProject };