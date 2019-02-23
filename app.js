const colorList = document.querySelector("ul.color-list");
const note = document.querySelector(".note");
const noteButton = document.querySelector(".new-note");
const notes = document.getElementById("notes");
const clearButton = document.querySelector(".clear-notes");
const noteContent = document.querySelector(".note-text");
const editButton = document.querySelector(".edit-note");

toggleEventListeners();

function toggleEventListeners() {
  colorList.parentElement.addEventListener("click", toggleColorList);
  noteButton.addEventListener("click", createNewNote);
  clearButton.addEventListener("click", clearNotes);

  notes.addEventListener("click", deleteNote);
  notes.addEventListener("dblclick", editNote);
  notes.addEventListener("click", saveNote);
}

function editNote(e) {
  if (e.target.className === "edit") {
    if (e.target.nextElementSibling.className === "note-text") {
      e.target.innerHTML = "s";
      e.target.nextElementSibling.contentEditable = true;
      e.target.className = "save";
    }
  }
}

function saveNote(e) {
  if (e.target.className === "save") {
    if (e.target.nextElementSibling.innerHTML !== "") {
      e.target.innerHTML = "e";
      e.target.nextElementSibling.contentEditable = false;
      e.target.className = "edit";
    }
  }
}

function deleteNote(e) {
  if (e.target.classList.contains("delete-note")) {
    e.target.parentElement.remove();
  }
}

function clearNotes() {
  do {
    notes.removeChild(notes.firstChild);
  } while (notes.firstChild);
}

function createNewNote() {
  let newNote = document.createElement("div");
  newNote.className = "note";
  newNote.innerHTML =
    '<button class="delete-note">X</button><button class="edit">e</button><p class="note-text"></p>';
  notes.append(newNote);
}

function changeNoteColor(e) {
  console.log(e.target);
}

function toggleColorList(e) {
  if (e.target === e.currentTarget) {
    if (e.target.children[0].style.display == "") {
      e.target.children[0].style.display = "block";
    } else {
      e.target.children[0].style.display = "";
    }
  }
  let currentBackgroundColor;
  let allNotes = document.querySelectorAll(".note");

  if (e.target.tagName === "LI") {
    if (e.target.classList.contains("yellow")) {
      currentBackgroundColor = "rgb(237, 237, 130)";
    }
    if (e.target.classList.contains("red")) {
      currentBackgroundColor = "red";
    }
    if (e.target.classList.contains("green")) {
      currentBackgroundColor = "green";
    }
    if (e.target.classList.contains("white")) {
      currentBackgroundColor = "whitesmoke";
    }

    for (let i = 0; i < allNotes.length; i++) {
      allNotes[i].style.backgroundColor = currentBackgroundColor;
    }
  }
}
