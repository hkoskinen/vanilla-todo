(function() {
  'use strict';

  const todoList = document.querySelector('.todo-list');
  const inputField = document.querySelector('.todo-form__input');
  const addButton = document.querySelector('.todo-form__button');

  const helper = (function() {
    const _storageType = sessionStorage;
    const _storageKey = 'muh_todos';
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

    function accessStorage() {
      let items;
      if (_storageType.getItem(_storageKey) === null) {
        items = [];
      } else {
        items = JSON.parse(_storageType.getItem(_storageKey));
      }
      return items;
    }

    function save(item) {
      let items = accessStorage();
      items.push(item);
      _storageType.setItem(_storageKey, JSON.stringify(items));
    }

    function load() {
      let items = accessStorage();
      return items;
    }

    function remove(removedItem) {
      let items = accessStorage();
      const remainingItems = items.filter(item => {
        return item.toLowerCase() !== removedItem.toLowerCase();
      });
      _storageType.setItem(_storageKey, JSON.stringify(remainingItems));
    }

    return {
      createTodo,
      save,
      load,
      remove
    };
  })();

  const handleAddButton = (e) => {
    e.preventDefault();
    if (inputField.value !== '') {
      todoList.appendChild(helper.createTodo(inputField.value));
      helper.save(inputField.value);
      inputField.value = '';
    }
  };

  const handleRemoveItem = (e) => {
    const parent = e.target.parentElement;
    if (parent.classList.contains('remove-item')) {
      helper.remove(parent.parentElement.textContent);
      parent.parentElement.remove();
    }
  };

  const handleInitialLoad = (e) => {
    const items = helper.load();
    items.forEach(item => {
      todoList.appendChild(helper.createTodo(item));
    });
  };

  addButton.addEventListener('click', handleAddButton);
  todoList.addEventListener('click', handleRemoveItem);
  document.addEventListener('DOMContentLoaded', handleInitialLoad);
}());
