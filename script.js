const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

// Allow pressing "Enter" to add
todoValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addUpdateClick.click();
  }
});

function CreateToDoData() {
  if (todoValue.value.trim() === "") {
    alert("Please Enter Your Reminder");
    todoValue.focus();
    return; // stop here
  }

  let li = document.createElement("li");
  const todoItems = `
    <div>${todoValue.value}</div>
    <div>
      <img class="edit todo-controls" src="images/pencil.png" alt="Edit">
      <img class="delete todo-controls" src="images/delete.png" alt="Delete">
    </div>
  `;

  li.innerHTML = todoItems;
  listItems.appendChild(li);
  todoValue.value = "";

  // Add delete functionality
  li.querySelector(".delete").addEventListener("click", function () {
    li.remove();
  });

  // Add edit functionality
  li.querySelector(".edit").addEventListener("click", function () {
    todoValue.value = li.firstElementChild.textContent; // put text back in input
    li.remove();
  });
}

