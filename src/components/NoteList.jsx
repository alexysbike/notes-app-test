import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { didSubscribe, withHandlers, compose } from 'proppy';
import { attach } from 'proppy-react';
import NoteCard from './NoteCard';

const P = compose(
  withHandlers({
    onNew: (props, { dispatch }) => () => {
      dispatch.notes.setEditableNote({ title: '', content: '' });
    },
  }),
  didSubscribe((props, { dispatch }) => {
    dispatch.notes.fetchNotes();
  }),
);

const NoteList = ({ notes, onNew }) => (
  <>
    <button type="button" className="button is-primary" onClick={onNew}>New</button>
    <div className="columns is-mobile is-multiline">
      {notes.map(({ title, content, id }) => (
        <div className="column is-4" key={id}>
          <NoteCard
            noteId={id}
            title={title}
            content={content}
          />
        </div>
      ))}
    </div>
  </>
);

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onNew: PropTypes.func.isRequired,
};

NoteList.defaultProps = {};

const mapStateToProps = state => ({
  notes: state.notes.notes,
});

export default connect(mapStateToProps)(attach(P)(NoteList));
