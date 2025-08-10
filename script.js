

const todoValue = document.getElementById("todoText"),
  listItems = document.getElementById("list-items"),
  addUpdateClick = document.getElementById("AddUpdateClick");

todoValue.addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    addUpdateClick.click();
  }
})
function CreateToDoData() {
    
  if (todoValue.value === ""){
    alert("Please Enter Your Reminder);
    todoValue.focus();
  }
  let li = document.createElement("li");
  const todoItems = '<div{todoValue.value}</div><div><img class = "edit todo-controls" src ="/image/pencil.png"><img class = "delete todo-controls" src ="/image/delete.png"/></div>';

  li.innerHTML=todoItems;
  listItems.appendChild(li);
  todoValue.value = "";
} 

