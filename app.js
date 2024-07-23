function saveTodosToLocalStorage(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodosFromLocalStorage(){
   return JSON.parse( localStorage.getItem('todos')) || [];
}  

function saveTodo(event){
    const task = event.target.parentElement;
    const donebtn = task.querySelector('.donebtn');
    donebtn.disabled=false;
    const editedTitle = task.querySelector('.edit-title');
    const editedDes = task.querySelector('.edit-description');
    editedTitle.classList.add('editable');

    editedDes.classList.add('editable');

    const orignalTitle = task.querySelector('.task-title');
    const orignalDes = task.querySelector('.task-description');

    orignalTitle.classList.remove('editable');
    orignalDes.classList.remove('editable');

    orignalTitle.textContent = editedTitle.value;
    orignalDes.textContent = editedDes.value;

    event.target.innerHTML = 'edit';
    event.target.onclick = editTodo;

    updateLocalStorage();
}

function trackTodo(event){
    const task = event.target.parentElement;
    event.target.disabled=true;
    task.querySelector('.editbtn').disabled=true;
    const tracker = task.querySelector('.tracker');
    tracker.classList.remove('editable');
    updateLocalStorage();
}

function editTodo(event){
    const task = event.target.parentElement;
    const donebtn = task.querySelector('.donebtn');
    donebtn.disabled=true;

    const oldTitle = task.querySelector('.task-title');
    const oldDes = task.querySelector('.task-description');

    oldTitle.classList.add('editable');
    oldDes.classList.add('editable');

    const newTitle = task.querySelector('.edit-title');
    const newDes = task.querySelector('.edit-description');

    newTitle.classList.remove('editable');
    newDes.classList.remove('editable');

    event.target.innerHTML='save';
    event.target.onclick =saveTodo;
    updateLocalStorage();

}

function removeTodo(event){
    const parent = event.target.parentNode;
    parent.remove();
    updateLocalStorage();
}

function addTodo(){
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if(!title){
        alert('please give title');
        return;
    }
    createTaskElement(title,description);
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    updateLocalStorage();
}

function createTaskElement(title,description,completed){
    const taskContainer = document.getElementById('allTasks');
    const task = document.createElement('div');
    task.setAttribute('class','task');

    const titleContainer = document.createElement('p');
    titleContainer.innerHTML =`${title}`;
    titleContainer.setAttribute('class','task-title');

    const editTitleInput = document.createElement('input');
    editTitleInput.setAttribute('class', 'edit-title editable');
    editTitleInput.value = title;

    const desContainer = document.createElement('div');
    desContainer.innerHTML = `${description}`;
    desContainer.setAttribute('class','task-description');

    const editDescriptionInput = document.createElement('textarea');
    editDescriptionInput.setAttribute('class','editable edit-description description');
    editDescriptionInput.value = description;


    const donebtn = document.createElement('button');
    donebtn.innerHTML='done';
    donebtn.setAttribute('class','donebtn');
    donebtn.onclick = trackTodo;
    
    const editbtn = document.createElement('button');        
    editbtn.innerHTML='edit';
    editbtn.setAttribute('class','editbtn');
    editbtn.onclick = editTodo;

    const tracker = document.createElement('div');
    tracker.setAttribute('class','tracker editable');
    tracker.innerHTML='Completed';

    const delbtn = document.createElement('button');
    delbtn.innerHTML='del';
    delbtn.setAttribute('class','delbtn');
    delbtn.onclick = removeTodo;

    task.appendChild(tracker);       
    task.appendChild(titleContainer);
    task.appendChild(desContainer);            
    task.appendChild(editTitleInput);
    task.appendChild(editDescriptionInput);
    task.appendChild(editbtn);
    task.appendChild(donebtn);  
    task.appendChild(delbtn);
    taskContainer.appendChild(task);
    if(completed){
        tracker.classList.remove('editable');
        donebtn.disabled=true;
        editbtn.disabled=true;

    }
}    

function loadTodos(){
    const tasks = getTodosFromLocalStorage();
    tasks.forEach(task => {
        createTaskElement(task.title,task.description,task.completed);               
    });
}

function updateLocalStorage(){
    const tasks=[];
    document.querySelectorAll('.task').forEach(task=>{
        const title = task.querySelector('.task-title').textContent;
        const description = task.querySelector('.task-description').textContent;
        const completed = !task.querySelector('.tracker').classList.contains('editable');
        tasks.push({title, description,completed});
    });
    saveTodosToLocalStorage(tasks);
}

const addbtn = document.getElementById('addbtn');
addbtn.onclick=addTodo;
window.addEventListener('load', loadTodos);

