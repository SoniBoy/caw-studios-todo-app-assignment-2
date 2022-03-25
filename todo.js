// state
const todos = [];
let todoText = "";

document.addEventListener("DOMContentLoaded", () => {
  const renderTodoList = () => {
    const list = document.getElementById("list");
    list.innerHTML = "";
    todos.forEach((todo, todoIdx) => {
      const todoItem = createTodoItem(todo, todoIdx);
      list.appendChild(todoItem);
    });
  };

  const createTodoItem = (todo, todoIdx) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTodo(todoIdx));

    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.done) {
      span.setAttribute("class", "strike-off");
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.addEventListener("change", toggleTodoCompletionStatus(todoIdx));
    checkbox.checked = todo.done;

    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(checkbox);

    return li;
  };

  const clearTextInput = () => {
    const input = document.getElementById("input");
    input.value = "";
    todoText = "";
  };

  // to prevent empty todo being added in the list
  const preventEmptySaveCheck = (callback) => {
    return () => {
      if (todoText) {
        callback();
      }
    };
  };

  const addTodo = preventEmptySaveCheck(() => {
    todos.push({
      text: todoText,
      done: false,
    });
    clearTextInput();
    renderTodoList();
  });

  const deleteTodo = (todoIdx) => {
    return () => {
      todos.splice(todoIdx, 1);
      renderTodoList();
    };
  };

  const toggleTodoCompletionStatus = (todoIdx) => {
    return (event) => {
      todos[todoIdx].done = event.target.checked;
      renderTodoList();
    };
  };

  // event listeners
  document.getElementById("input").addEventListener("change", (event) => {
    todoText = event.target.value;
  });
  document.getElementById("saveBtn").addEventListener("click", addTodo);
  document.getElementById("input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      todoText = event.target.value;
      addTodo();
    }
  });
});
