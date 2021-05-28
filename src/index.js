'use strict'
import './main.min.css';
import {Project, inputProject} from './modules/objects';

const expand = document.querySelector('#sidebar');
const expandNewProject = document.querySelector('main');
const btnAdd = document.querySelector('#btn-add-project');
let project = new Project(expand, 'Default', 'X', 1);
let renderInput = new inputProject(expandNewProject, 'Add new project name', 'Add Project', 'Cancel');
project.expandHtml();

btnAdd.addEventListener('click', () => {
    renderInput.expandHtml();
    renderInput.aside.style.transform = 'scale(1)';
})
