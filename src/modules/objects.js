'use strict'

const TodoProject = (projectName, active) => {
    const getProjectName = () => projectName;
    return {getProjectName, active};
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

export {ToDo};