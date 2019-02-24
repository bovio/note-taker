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
  notes.addEventListener("click", editNote);
  notes.addEventListener("click", saveNote);
  document.addEventListener("DOMContentLoaded", loadNotes);
}

function loadNotes() {
  let localNotes = JSON.parse(localStorage.getItem("noteArray"));
  localNotes.forEach(item => {
    let newNote = document.createElement("div");
    newNote.className = "note";
    newNote.innerHTML = `<button class="delete-note">X</button><button class="edit">e</button><p class="note-text">${item}</p>`;
    notes.append(newNote);
  });
}

function storeNote(input) {
  let noteArray;
  if (localStorage.getItem("noteArray") === null) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(localStorage.getItem("noteArray"));
  }
  noteArray.push(input);

  localStorage.setItem("noteArray", JSON.stringify(noteArray));
}

// Remove from LS
function removeNote(input) {
  let noteArray;
  if (localStorage.getItem("noteArray") === null) {
    noteArray = [];
  } else {
    noteArray = JSON.parse(localStorage.getItem("noteArray"));
  }

  noteArray.forEach(function(noteItem, index) {
    if (input.textContent === noteItem) {
      noteArray.splice(index, 1);
    }
  });

  localStorage.setItem("noteArray", JSON.stringify(noteArray));
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
      storeNote(e.target.nextElementSibling.textContent);
    }
  }
}

function deleteNote(e) {
  if (e.target.classList.contains("delete-note")) {
    e.target.parentElement.remove();
    removeNote(e.target.nextElementSibling.nextElementSibling);
  }
}

function clearNotes() {
  do {
    notes.removeChild(notes.firstChild);
  } while (notes.firstChild);
  localStorage.clear();
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
