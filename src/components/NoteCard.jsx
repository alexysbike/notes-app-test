/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withHandlers } from 'proppy';
import { attach } from 'proppy-react';

const P = withHandlers({
  onEditClick: ({ noteId: id, title, content }, { dispatch }) => () => {
    dispatch.notes.setEditableNote({ id, title, content });
  },
});

const NoteCard = ({ title, content, onEditClick }) => (
  <div className="card">
    <div className="card-content">
      <p className="title">
        {title}
      </p>
      <p>{content}</p>
    </div>
    <footer className="card-footer">
      <button type="button" className="card-footer-item" onClick={onEditClick}>
        Edit
      </button>
    </footer>
  </div>
);

NoteCard.propTypes = {
  noteId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

NoteCard.defaultProps = {};

export default attach(P)(NoteCard);
