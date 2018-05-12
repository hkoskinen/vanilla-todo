(function() {
  'use strict';

  const todoList = document.querySelector('.todo-list');
  const inputField = document.querySelector('.todo-form__input');
  const addButton = document.querySelector('.todo-form__button');

  // TODO: Is this enough?
  const escape = (input) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;');
  };

  const handleAddButton = (e) => {
    e.preventDefault();

    if (inputField.value !== '') {
      const li = document.createElement('li');
      li.classList.add('todo-list__item');
      li.innerHTML = `${escape(inputField.value)} <i class="fa fa-times"></i>`;
      todoList.appendChild(li);

      inputField.value = '';
    }
  };

  addButton.addEventListener('click', handleAddButton);
}());
