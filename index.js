const container = document.querySelector("div");
const inputTitle = document.querySelector("#input-title");
const inputDescription = document.querySelector("#description");
const inputDueDate = document.querySelector("#due-date");
const addBtnEl = document.querySelector("#add-btn");
const TodoList = document.querySelector("#todo-list");

// update content
const editModal = document.querySelector(".edit-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const editTitle = document.querySelector("#edit-title");
const editDescription = document.querySelector("#edit-description");
const editDueDate = document.querySelector("#edit-due-date");
const updateBtn = document.querySelector("#update-btn");

const sortAscBtn = document.querySelector("#sort-asc-btn");
const sortDescBtn = document.querySelector("#sort-desc-btn");

let currentItem = null;

addBtnEl.addEventListener("click", function () {
  // accepting input values
  titleValue = inputTitle.value;
  description = inputDescription.value;
  dueDate = inputDueDate.value;
  if (titleValue === "" || dueDate === "") {
    alert("Please fill out all fields.");
    return;
  }

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  // create elements to render list to page
  titleElement = document.createElement("h3");
  titleElement.innerText = titleValue;

  descriptionElement = document.createElement("p");
  descriptionElement.innerText = description;

  dateElement = document.createElement("p");
  dateElement.innerText = `Due: ${new Date(dueDate).toLocaleString()}`;

  const markComplete = document.createElement("input");
  markComplete.type = "checkbox";
  markComplete.textContent = "Mark Complete";
  markComplete.addEventListener("change", function () {
    if (markComplete.checked) {
      todoItem.classList.add("completed");
    } else {
      todoItem.classList.remove("completed");
    }
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("btn-container");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    TodoList.removeChild(todoItem);
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    editModal.style.display = "block";

    currentItem = editButton.closest(".item");

    editTitle.value = titleElement.textContent;
    editDescription.value = descriptionElement.textContent;
    const dueDateString = dateElement.textContent.replace("Due: ", "");
    editDueDate.value = new Date(dueDateString).toISOString().slice(0, 16);
  });

  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(editButton);

  textContainer.appendChild(titleElement);
  textContainer.appendChild(descriptionElement);

  const todoItem = document.createElement("li");
  todoItem.classList.add("item");

  todoItem.appendChild(markComplete);
  todoItem.appendChild(textContainer);
  todoItem.appendChild(dateElement);
  todoItem.appendChild(buttonContainer);
  TodoList.appendChild(todoItem);

  clearInputFields();

  sortList();
});

// function to clear input fields
function clearInputFields() {
  inputTitle.value = "";
  inputDescription.value = "";
  inputDueDate.value = "";
}

//close edit modal
modalCloseBtn.addEventListener("click", function () {
  editModal.style.display = "none";
});

// update conetent
updateBtn.addEventListener("click", function () {
  if (!currentItem) return;

  const titleValue = editTitle.value.trim();
  const descriptionValue = editDescription.value.trim();
  const dueDateValue = editDueDate.value.trim();

  if (!titleValue || !dueDateValue) {
    alert("Please enter title and due date.");
    return;
  }

  const titleElement = currentItem.querySelector("h3");
  const descriptionElement = currentItem.querySelector("p:nth-child(2)");
  const dateElement = currentItem.querySelector("p:nth-child(3)");

  titleElement.textContent = titleValue;
  descriptionElement.textContent = descriptionValue;
  dateElement.textContent = `Due: ${new Date(dueDateValue).toLocaleString()}`;

  editModal.style.display = "none";
  currentItem = null;
});

sortAscBtn.addEventListener("click", function () {
  sortList(true);
});

sortDescBtn.addEventListener("click", function () {
  sortList(false);
});

function sortList(ascending = true) {
  const itemsArray = Array.from(TodoList.children);
  itemsArray.sort((a, b) => {
    const dateA = new Date(
      a.querySelector(".text-container + p").textContent.replace("Due: ", "")
    );
    const dateB = new Date(
      b.querySelector(".text-container + p").textContent.replace("Due: ", "")
    );
    return ascending ? dateA - dateB : dateB - dateA;
  });

  itemsArray.forEach((item) => TodoList.appendChild(item));
}
