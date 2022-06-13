const btn = document.getElementById('todo-button');
const todoInput = document.getElementById('todo-input');
const todoUl = document.getElementById('todo-ul');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

renderSavedTodos();

function renderSavedTodos() {
  todos.forEach((todo) => {
    createListElement(todo);
  });
}

function createListElement(todo) {

  const { id, content, isDone } = todo;
  todoUl.innerHTML += `
     <li id=${id} class=${isDone ? 'checked' : ''} >
      <i class="fa fa-check"></i>
      <p>${content}</p>
      <i class="fa fa-trash"></i>
    </li>`;
}


window.onload = function () {
  todoInput.focus();
};


btn.addEventListener('click', () => {
  if (!todoInput.value) {
    alert('Please enter your todo');
  } else {
    const todoObject = {
      id: new Date().getTime(),
      isDone: false,
      content: todoInput.value,
    };

    
    todos.push(todoObject);


    localStorage.setItem('todos', JSON.stringify(todos));

    createListElement(todoObject);
    todoInput.value = '';
  }
});


todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    btn.click();
  }
});


todoUl.addEventListener('click', (e) => {
  const id = e.target.parentElement.getAttribute('id');
  
  if (e.target.classList.contains('fa-trash')) {
    
    todos = todos.filter((todo) => todo.id != id);

    
    localStorage.setItem('todos', JSON.stringify(todos));

    
    e.target.parentElement.remove();
  }


  if (e.target.classList.contains('fa-check')) {
    
    todos.map((todo, index) => {
      if (todo.id == id) {
        todos[index].isDone = !todos[index].isDone;
      }
    });

  
    localStorage.setItem('todos', JSON.stringify(todos));

   
    if (e.target.parentElement.classList.contains('checked')) {
      e.target.parentElement.classList.remove('checked');
    } else {
      
      e.target.parentElement.classList.add('checked');
    }
  }
});
