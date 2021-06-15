import { format, parseISO } from "date-fns";

function Project(htmlExpand, title, emText, dataIndex) {
    //Create DOM Elements and propertys
    let div = document.createElement('div');
    div.classList.add('project');
    div.dataset.index = dataIndex;
    div.textContent = title;
    let em = document.createElement('em');
    em.classList.add('delete');
    em.textContent = emText;
    div.appendChild(em);
    let isActive = false;
    //Methods
    const expandHtml = () => htmlExpand.appendChild(div);
    return { expandHtml, div, isActive, title };
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

function ToDo(htmlExpand, index) {
    let prioritys = ['height', 'medium', 'low'];
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.dataset.index = index;
    const removeToDo = document.createElement('em');
    removeToDo.classList.add('delete');
    removeToDo.textContent = 'X';
    const todoTitle = document.createElement('h3');
    todoTitle.classList.add('todo-title');
    todoTitle.style.display = 'none';
    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description');
    todoDescription.style.display = 'none';
    const tododueDate = document.createElement('span');
    tododueDate.classList.add('todo-dueDate');
    tododueDate.style.display = 'none';
    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.classList.add('input-todo-title');
    inputTitle.placeholder = 'Title';
    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.classList.add('input-todo-description');
    inputDescription.placeholder = 'Description';
    const dueDate = document.createElement('input');
    dueDate.type = 'date';
    const priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'todo-priority');
    priorityLabel.textContent = 'priority:';
    const selectionPriority = document.createElement('select');
    selectionPriority.classList.add('todo-priority');
    selectionPriority.name = 'todo-priority';
    let options = [];
    for(let i = 0; i < prioritys.length; i++){
        const option = document.createElement('option');
        options.push(option);
        option.value = prioritys[i];
        option.textContent = prioritys[i];
        selectionPriority.appendChild(option);
    }
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('edit');
    btnEdit.textContent = 'Edit';
    const btnSubmit = document.createElement('button');
    btnSubmit.classList.add('submit');
    btnSubmit.textContent = 'Submint';

    todoDiv.appendChild(removeToDo);
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDescription);
    todoDiv.appendChild(tododueDate);
    todoDiv.appendChild(inputTitle);
    todoDiv.appendChild(inputDescription);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(priorityLabel);
    todoDiv.appendChild(selectionPriority);
    todoDiv.appendChild(btnEdit);
    todoDiv.appendChild(btnSubmit);


    const expandHtml = () => htmlExpand.appendChild(todoDiv);
    const addContent = () => {
        if(!inputTitle.value == '' && !inputDescription == '' && !dueDate == '') {
            let title = inputTitle.value;
            let description = inputDescription.value;
            let dueDateValue = dueDate.value;
            dueDateValue = (format(parseISO(dueDateValue), 'dd. MMMM yyyy'))
            inputTitle.style.display = 'none';
            inputDescription.style.display = 'none';
            dueDate.style.display = 'none';
            todoTitle.textContent = title;
            todoDescription.textContent = description;
            tododueDate.textContent = dueDateValue;
            todoTitle.style.display = 'block';
            todoDescription.style.display = 'block';
            tododueDate.style.display = 'block';

        }
    }
    const editTodo = () => {
        if(todoTitle.style.display === 'block'){
            todoTitle.textContent = '';
            todoDescription.textContent = '';
            tododueDate.textContent = '';
            todoTitle.style.display = 'none';
            todoDescription.style.display = 'none';
            tododueDate.style.display = 'none';
            inputTitle.style.display = 'block'
            inputDescription.style.display = 'block';
            dueDate.style.display = 'block';
        }
    }
    return {expandHtml, addContent, editTodo, todoDiv, options, dueDate};
}

export { Project, InputProject, ToDo};