import { Project, inputProject} from './objects';

const changeProject = (projects) => {
    for(let project of projects){
        project.div.addEventListener('click', () => {
            console.log(project.div.firstChild.textContent);
        })
    }
}

const changeHidden = (...args) => {
    for(let item of args){
        item.classList.toggle('hidden');
    }
}
const init = (() => {
    const expand = document.querySelector('#sidebar');
    const expandNewProject = document.querySelector('main');
    const btnAdd = document.querySelector('#btn-add-project');
    let overlay = document.querySelector('.overlay');
    let project = new Project(expand, 'Default', 'X', 1);
    let projects = [];
    projects.push(project);
    let renderInput = new inputProject(expandNewProject, 'Add new project name', 'Add Project', 'Cancel');
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
        if(renderInput.input.value === '') {
            renderInput.h2.textContent = 'Please type in a Project name' ;
        } else{
            let project = new Project(expand, renderInput.input.value, 'X', (projects.length + 1))
            projects.push(project);
            project.expandHtml();
            renderInput.input.value = '';
            changeHidden(renderInput.aside, overlay);
            changeProject(projects);
        }
    })
    //changeProject(projects);
})();





export {init};

