const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

let editTodo = null; // track if editing a task

// Allow pressing Enter to add task
todoValue.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addUpdateClick.click();
  }
});

function CreateToDoData() {
  if (todoValue.value.trim() === "") {
    alert("Please Enter Your Reminder");
    todoValue.focus();
    return;
  }

  if (editTodo) {
    // If editing, just update text
    editTodo.firstChild.textContent = todoValue.value;
    editTodo = null;
    addUpdateClick.src = "add-icon-design-in-round-shape-png-1.png";
  } else {
    // Create new task
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${todoValue.value}</span>
      <div>
        <img class="edit todo-controls" src="image/pencil.png" onclick="editTask(this)" />
        <img class="delete todo-controls" src="image/delete.png" onclick="deleteTask(this)" />
      </div>
    `;
    listItems.appendChild(li);
  }

  todoValue.value = "";
}

// Delete task
function deleteTask(e) {
  e.parentElement.parentElement.remove();
}

// Edit task
function editTask(e) {
  editTodo = e.parentElement.parentElement;
  todoValue.value = editTodo.firstChild.textContent;
  addUpdateClick.src = "image/update.png"; // change button icon
  todoValue.focus();
}
