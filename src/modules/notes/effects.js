/* eslint-disable no-console */
import api from '../../services/api';

const effects = {
  async fetchNotes() {
    try {
      const notes = await api.fetchNotes();
      this.setNotes(notes);
    } catch (e) {
      console.log(e);
    }
  },
  async saveNote(note, rootState) {
    try {
      const newNote = await api.saveNote(note);
      const filteredNotes = rootState.notes.notes.filter(item => item.id !== newNote.id);
      this.setNotes([newNote, ...filteredNotes]);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

export default effects;
