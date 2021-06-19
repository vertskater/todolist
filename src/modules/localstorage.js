import { Project } from './objects';
import { projects, addEvents } from './dommanipulation';
import { changeBackgroundColor } from '../index';
let projectNames = [];

const expand = document.querySelector('#sidebar');

function loadDefaultLocalStorage(name) {
    if (localStorage.getItem(name)) {
        let project = new Project(expand, 'Default', 'X', 1);
        project.isActive = true;
        projects.push(project);
        changeBackgroundColor(project, project.div);
        project.expandHtml();
    } else {
        return;
    }
}
function loadProjectLocalStorage(name) {
    let allProjects = JSON.parse(localStorage.getItem(name))
    for(let item of allProjects){
        let project = new Project(expand, item, 'X', 1);
        project.isActive = true;
        projects.push(project);
        changeBackgroundColor(project, project.div);
        project.expandHtml();
    }
}

function updateLocalStorage(name, item) {
    localStorage.setItem(name, item);
}
function updateLocalStorageProjects(name, item) {
    projectNames.push(item);
    localStorage.setItem(name, JSON.stringify(projectNames));
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export {
    storageAvailable, updateLocalStorage, updateLocalStorageProjects, loadDefaultLocalStorage,
    loadProjectLocalStorage
}