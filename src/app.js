(function() {
  'use strict';

  const todoList = document.querySelector('.todo-list');
  const inputField = document.querySelector('.todo-form__input');
  const addButton = document.querySelector('.todo-form__button');

  const helper = (function() {
    function escape(input) {
      return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');
    }

    function createTodo(text) {
      const li = document.createElement('li');
      li.classList.add('todo-list__item');
      li.appendChild(document.createTextNode(escape(text)));

      const del = document.createElement('a');
      del.className = 'remove-item';
      del.innerHTML = '<i class="fa fa-trash"></i>';
      li.appendChild(del);
      return li;
    }

    return {
      createTodo
    };
  })();

  const handleAddButton = (e) => {
    e.preventDefault();
    if (inputField.value !== '') {
      todoList.appendChild(helper.createTodo(inputField.value));
      inputField.value = '';
    }
  };

  const handleRemoveItem = (e) => {
    const parent = e.target.parentElement;
    if (parent.classList.contains('remove-item')) {
      parent.parentElement.remove();
    }
  };

  addButton.addEventListener('click', handleAddButton);
  todoList.addEventListener('click', handleRemoveItem);
}());
