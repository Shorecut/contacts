const contactContainer = document.querySelector("#contact-container");
const addForm = document.querySelector(".add-contact");
const addName = document.querySelector("#name");
const addSurname = document.querySelector("#surname");
const addImg = document.querySelector("#img");
const addNumber = document.querySelector("#num");

const resetBtn = document.querySelector(".reset-btn");
const editModal = document.querySelector("#edit-modal");
const closeModalBtn = document.querySelector("#close-modal");
const editInputName = document.querySelector("#edit-input-name");
const editInputSurname = document.querySelector("#edit-input-surname");
const editInputImg = document.querySelector("#edit-input-img");
const editInputNumber = document.querySelector("#edit-input-number");

const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

render();

function render() {
  contactContainer.innerHTML = "";
  contacts.forEach((item) => {
    contactContainer.innerHTML += `
    <div class="contact-item">
    
      <img src ="${item.img}" alt=""  style="width:100px; height: 100px; border-radius: 50%;"/>
    <span>${item.name}</span>
    <span>${item.surname}</span>
    <span>${item.number}</span>
      <div>
        <button id = "${item.id}"class="edit-btn">Edit</button>
        <button id= "${item.id}" class="delete-btn">Delete</button>
      </div>

    </div>
    `;
  });
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    !addName.value.trim() ||
    !addSurname.value.trim() ||
    !addNumber.value.trim()
  ) {
    addName.value = "";
    addNumber = "";
    return;
  }

  const list = {
    id: Date.now(),
    name: addName.value,
    surname: addSurname.value,
    img: addImg.value,
    number: addNumber.value,
  };

  contacts.push(list);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  addName.value = "";
  addSurname.value = "";
  addImg.value = "";
  addNumber.value = "";

  render();
});

//! Delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    contacts = contacts.filter((item) => item.id != e.target.id);
    localStorage.setItem("contacts", JSON.stringify(contacts));

    render();
  }
});

//! Edit

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";

    const contactToEdit = contacts.find((item) => item.id == e.target.id);

    editInputName.value = contactToEdit.name;
    editInputSurname.value = contactToEdit.surname;
    editInputImg.value = contactToEdit.img;
    editInputNumber.value = contactToEdit.number;

    editSubmit.id = e.target.id;
  }
});

closeModalBtn.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editModal.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    editModal.style.visibility = "hidden";
  }
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editInputName.value.trim() ||
    !editInputSurname.value.trim() ||
    !editInputNumber.value.trim()
  ) {
    return;
  }

  contacts = contacts.map((item) => {
    if (item.id == e.target.id) {
      item.name = editInputName.value;
      item.surname = editInputSurname.value;
      item.img = editInputImg.value;
      item.number = editInputNumber.value;
    }
    return item;
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));
  render();
  editCancel.click();
});
