
function Project(htmlExpand, divText, emText, dataIndex){
    //Create DOM Elements
    let div = document.createElement('div');
    div.classList.add('project');
    div.dataset.index = dataIndex;
    div.textContent = divText;
    let em = document.createElement('em');
    em.classList.add('delete');
    em.textContent = emText;
    div.appendChild(em);
    //Methods
    const expandHtml = () => htmlExpand.appendChild(div);
    return {expandHtml, div};
}

function inputProject(htmlExpand, textContent, btnContent, cancelContent){
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
    return {expandHtml, aside, button1, button2, input, h2};
}


export {Project, inputProject};