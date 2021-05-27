import { addProject, allProjects } from './dommanipulation';

const findProjectName = () => {
    let projects = allProjects.showProjects();
    for (let project of projects) {
        project.addEventListener('click', () => {
            return project.firstChild.textContent;
        })
    }
}

export {findProjectName};

