'use strict'
import { format } from 'date-fns'


const ToDo = (title, description, dueDate, priority) => {
    dueDate = format(dueDate, 'dd.MM.yyyy');
    const getDate = () => dueDate;
    return {getDate};
}

/*
const TodoProject = (projectName, active, todos=[]) => {
    const getProjectName = () => projectName;
    const todosContent = (todos) => {
        for(let todo of todos){
            console.log(todo);
        }
    }
    return {getProjectName, todosContent, active, todos};
}

const ToDo = (projectName, title, description, dueDate, priority) => {
    const prototype = TodoProject(projectName);
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const changePriority = (newPriority) => priority = newPriority;
    const changeTitle = (newTitle) => title = newTitle;
    const changeDescription = (newDescription) => description = newDescription;
    const changeDueDate = (newDate) => dueDate = newDate;
    return Object.assign({}, prototype, {getTitle, getDescription, getDueDate, getPriority, changePriority, changeTitle, changeDescription, changeDueDate})
}
*/
export {ToDo};