
function Project(htmlExpand, divText, emText, dataIndex){
    let div = document.createElement('div');
    div.classList.add('project');
    div.dataset.index = dataIndex;
    div.textContent = divText;
    let em = document.createElement('em');
    em.classList.add('delete');
    em.textContent = emText;
    div.appendChild(em);
    const expandHtml = () => htmlExpand.appendChild(div);
    return {expandHtml};
}

function inputProject(htmlExpand, textContent, btnContent, cancelContent){
    let aside = document.createElement('aside');
    aside.classList.add('type-project-name');
    let h2 = document.createElement('h2');
    h2.classList.add('overlay-title');
    h2.textContent = textContent;
    let input = document.createElement('input');
    input.id = 'project-name';
    input.type = 'text';
    let button1 = document.createElement('button');
    button1.id = 'btn-project-name';
    button1.textContent = btnContent;
    let button2 = document.createElement('button');
    button2.id = 'btn-cancel-project'
    button2.textContent = cancelContent;
    aside.appendChild(h2)
    aside.appendChild(input)
    aside.appendChild(button1)
    aside.appendChild(button2);
    const expandHtml = () => htmlExpand.appendChild(aside);
    return {expandHtml, aside};
}


export {Project, inputProject};