
function Project(htmlExpand, divText, emText, dataIndex) {
    //Create DOM Elements and propertys
    let div = document.createElement('div');
    div.classList.add('project');
    div.dataset.index = dataIndex;
    div.textContent = divText;
    let em = document.createElement('em');
    em.classList.add('delete');
    em.textContent = emText;
    div.appendChild(em);
    let isActive = false;
    //Methods
    const expandHtml = () => htmlExpand.appendChild(div);
    return { expandHtml, div, isActive };
}

function InputProject(htmlExpand, textContent, btnContent, cancelContent) {
    //Craete DOM Elements
    const aside = document.createElement('aside');
    aside.classList.add('type-project-name');
    const h2 = document.createElement('h2');
    h2.classList.add('overlay-title');
    h2.textContent = textContent;
    const input = document.createElement('input');
    input.id = 'project-name';
    input.type = 'text';
    const button1 = document.createElement('button');
    button1.id = 'btn-project-name';
    button1.textContent = btnContent;
    const button2 = document.createElement('button');
    button2.id = 'btn-cancel-project'
    button2.textContent = cancelContent;
    aside.appendChild(h2);
    aside.appendChild(input);
    aside.appendChild(button1);
    aside.appendChild(button2);

    //Methods
    const expandHtml = () => htmlExpand.appendChild(aside);
    return { expandHtml, aside, button1, button2, input, h2 };
}

function ToDo(htmlExpand) {
    let prioritys = ['height', 'medium', 'low'];
    const todo = document.createElement('div');
    todo.classList.add('todo');
    const removeToDo = document.createElement('em');
    removeToDo.classList.add('delete');
    removeToDo.textContent = 'X';
    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.style.display = 'none';
    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description');
    todoDescription.style.display = 'none';
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.id = 'input-todo-title';
    inputTitle.placeholder = 'Title';
    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.id = 'input-todo-description';
    inputDescription.placeholder = 'Description';
    const dueDate = document.createElement('input');
    dueDate.type = 'date';
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'priority:';
    const selectionPriority = document.createElement('select');
    selectionPriority.id = 'todo-priority';
    selectionPriority.name = 'todo-priority';
    for(let i = 0; i < prioritys.length; i++){
        const option = document.createElement('option');
        option.value = prioritys[i];
        option.textContent = prioritys[i];
        selectionPriority.appendChild(option);
    }
    const btnEdit = document.createElement('button');
    btnEdit.id = 'edit';
    btnEdit.textContent = 'Edit';
    const btnSubmit = document.createElement('button');
    btnSubmit.id = 'submit';
    btnSubmit.textContent = 'Submint';

    todo.appendChild(removeToDo);
    todo.appendChild(todoTitle);
    todo.appendChild(todoDescription);
    todo.appendChild(inputTitle);
    todo.appendChild(inputDescription);
    todo.appendChild(dueDate);
    todo.appendChild(priorityLabel);
    todo.appendChild(selectionPriority);
    todo.appendChild(btnEdit);
    todo.appendChild(btnSubmit);

    const expandHtml = () => htmlExpand.appendChild(todo);
    return {expandHtml};
}

export { Project, InputProject, ToDo};