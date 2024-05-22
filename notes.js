const { default: chalk } = require("chalk");
const fs = require("fs");
const getNotes = (params) => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = laodNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};

const laodNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const jsonData = dataBuffer.toString();
    return JSON.parse(jsonData);
  } catch (error) {
    return [];
  }
};

const removeNote = (title) => {
  const notes = laodNotes();
  const notesToKeep = notes.filter((item) => item.title !== title);
  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse("Note not found"));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.red.inverse("Note removed"));
  }
};

const listNotes = () => {
  const notes = laodNotes();
  notes.forEach((element) => {
    console.log(chalk.inverse(element.title));
  });
};

const readNote = (title) => {
  const notes = laodNotes();
  const note = notes.find((item) => item.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found"));
  }
};
module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
};
