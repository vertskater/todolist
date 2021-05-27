'use strict'
import './main.min.css';
import { ToDo } from './modules/objects';
import { addProject, allProjects } from './modules/dommanipulation';
import { findProjectName } from './modules/functions';

const getAllProjects = (() => {
    const projects = document.querySelectorAll('.project');
    if(projects.length <= 1){
        for (let project of projects) {
            allProjects.addProjects(project);
        }
    }
})();
addProject();

/*
window.addEventListener('click', () =>{
    console.log(allProjects.showProjects());
})
*/


