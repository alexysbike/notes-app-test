import React from 'react';
import NoteList from '../NoteList';
import NoteModal from '../NoteModal';

const App = () => (
  <div className="App">
    <h1>Notes</h1>
    <NoteList />
    <NoteModal />
  </div>
);

export default App;
