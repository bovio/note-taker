const colorList = document.querySelector("ul.color-list");
const note = document.querySelector(".note");
const noteButton = document.querySelector(".new-note");
const notes = document.getElementById("notes");
const clearButton = document.querySelector(".clear-notes");
const noteContent = document.querySelector(".note-text");
const editButton = document.querySelector(".edit-note");

// TO FIX:
// Editing previously stored note keeps both original and updated note
// Putting multiple notes on deck, all blanks will disappear when one is saved

// Features to add:
// Colors for individual notes, stored

let currentBackgroundColor;

class Note {
  constructor(noteText, color) {
    this.noteText = noteText;
    this.color = color;
  }
}

class UI {
  toggleColorList(e) {
    if (e.target === e.currentTarget) {
      if (e.target.children[0].style.display == "") {
        e.target.children[0].style.display = "block";
      } else {
        e.target.children[0].style.display = "";
      }
    }
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

  createNewNote() {
    let newNote = document.createElement("div");
    newNote.className = "note";
    newNote.innerHTML =
      '<button class="delete-note">X</button><button class="edit">e</button><p color=${currentBackgroundColor} class="note-text"></p>';
    notes.append(newNote);
  }

  deleteNote(e) {
    if (e.target.className === "delete-note") {
      e.target.parentElement.remove();
      this.removeNote(e.target.nextElementSibling.nextElementSibling);
    }
  }

  editNote(e) {
    if (e.target.className === "edit") {
      if (e.target.nextElementSibling.className === "note-text") {
        e.target.innerHTML = "s";
        e.target.nextElementSibling.contentEditable = true;
        e.target.className = "save";
      }
    }
  }

  saveNote(e) {
    if (e.target.className === "save") {
      if (e.target.nextElementSibling.innerHTML !== "") {
        e.target.innerHTML = "e";
        e.target.nextElementSibling.contentEditable = false;
        e.target.className = "edit";
        this.storeNote(e.target.nextElementSibling.textContent);
        window.location.reload();
      }
    }
  }

  clearNotes() {
    do {
      notes.removeChild(notes.firstChild);
    } while (notes.firstChild);
    localStorage.clear();
  }
  // Local storage methods

  loadNotes() {
    let localNotes = JSON.parse(localStorage.getItem("noteArray"));
    localNotes.forEach(item => {
      let newNote = document.createElement("div");
      newNote.className = "note";
      newNote.innerHTML = `<button class="delete-note">X</button><button class="edit">e</button><p color=${currentBackgroundColor} class="note-text">${item}</p>`;
      notes.append(newNote);
    });
  }

  storeNote(input) {
    let noteArray;
    if (localStorage.getItem("noteArray") === null) {
      noteArray = [];
    } else {
      noteArray = JSON.parse(localStorage.getItem("noteArray"));
    }
    noteArray.push(input);

    localStorage.setItem("noteArray", JSON.stringify(noteArray));
  }

  removeNote(input) {
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
}
// EVENT LISTENERS
colorList.parentElement.addEventListener("click", function(e) {
  const ui = new UI();
  ui.toggleColorList(e);
});

noteButton.addEventListener("click", function() {
  const ui = new UI();
  ui.createNewNote();
});

clearButton.addEventListener("click", function() {
  const ui = new UI();
  ui.clearNotes();
});

notes.parentElement.addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteNote(e);
});

notes.parentElement.addEventListener("click", function(e) {
  const ui = new UI();
  ui.editNote(e);
});
notes.parentElement.addEventListener("mousedown", function(e) {
  const ui = new UI();
  ui.saveNote(e);
});

document.addEventListener("DOMContentLoaded", function() {
  const ui = new UI();
  ui.loadNotes();
});

// function changeNoteColor(e) {
//   console.log(e.target);
// }
