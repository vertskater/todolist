import { Project, inputProject} from './objects';
let projects = [];

const setProjectsFalse = () => {
    for(let item of projects){
        item.isActive = false
    }
}
const changeHidden = (...args) => {
    for(let item of args){
        item.classList.toggle('hidden');
    }
}

const changeBackgroundColor = (project, item) => {
    for(let item of projects){
        item.div.style.backgroundColor = 'white';
    }
    project.isActive ? item.style.backgroundColor = 'lightgreen' : item.style.backgroundColor = 'white'; 
}
const setNewIndex = () => {
    let i = 1;
    for(let item of projects){
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
        while(targetElement != null){
            if(targetElement.matches('.project')){
                let currentProject = projects[targetElement.dataset.index - 1]
                setProjectsFalse();
                currentProject.isActive = true;
                console.log(currentProject, currentProject.div)
                changeBackgroundColor(currentProject, currentProject.div )
                console.log(projects);
                return
            }
            targetElement = targetElement.parentElement;
        }
    }, true)
}

//Delete Project Elements form DOM and Array
const projectsDelete = (rootElement, event) => {
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target
        while(targetElement != null){
            if(targetElement.matches('.delete')){
                let currentProject = projects[targetElement.parentElement.dataset.index - 1]
                if (currentProject.isActive){
                    setProjectsFalse()
                    projects[0].isActive = true;
                    changeBackgroundColor(projects[0], projects[0].div);
                }
                if(projects.length <= 1){
                    setNewIndex();
                    return
                }else{
                    projects.splice([targetElement.parentElement.dataset.index -1],1);
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
projectsDelete(sidebar, 'click');

export {init};

