import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withHandlers, compose, withStateHandlers } from 'proppy';
import { attach } from 'proppy-react';

const P = compose(
  withStateHandlers({
    loading: false,
    error: false,
  }, {
    setLoading: () => value => ({ loading: value }),
    setError: () => value => ({ error: value }),
  }),
  withHandlers({
    onCloseModal: (props, { dispatch }) => () => {
      dispatch.notes.setEditableNote(null);
    },
    onChange: ({ editableNote }, { dispatch }) => ({ target: { name, value } }) => {
      const newEditableNote = {
        ...editableNote,
        [name]: value,
      };
      dispatch.notes.setEditableNote(newEditableNote);
    },
    onSave: ({ editableNote, setLoading, setError }, { dispatch }) => async () => {
      try {
        setError(false);
        setLoading(true);
        await dispatch.notes.saveNote(editableNote);
        dispatch.notes.setEditableNote(null);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
  }),
);

const NoteModal = ({
  active, onCloseModal, onChange, onSave, editableNote: { title, content }, loading, error,
}) => (
  <div className={`modal ${active ? 'is-active' : ''}`}>
    <div className="modal-background" onClick={onCloseModal} role="presentation" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Note</p>
        <button type="button" className="delete" aria-label="close" onClick={onCloseModal} />
      </header>
      <section className="modal-card-body">
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Title..."
          value={title}
          onChange={onChange}
        />
        <textarea
          className="input"
          placeholder="Content..."
          name="content"
          value={content}
          onChange={onChange}
        />
        {loading && <p>Loading....</p>}
        {error && <p>Wrong!!!</p>}
      </section>
      <footer className="modal-card-foot">
        <button type="button" className="button is-success" onClick={onSave}>Save changes</button>
        <button type="button" className="button" onClick={onCloseModal}>Cancel</button>
      </footer>
    </div>
  </div>
);

NoteModal.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editableNote: PropTypes.shape(),
};

NoteModal.defaultProps = {
  active: false,
  editableNote: { title: '', content: '' },
};

const mapStateToProps = state => ({
  active: !!state.notes.editableNote,
  editableNote: state.notes.editableNote || { title: '', content: '' },
});

export default connect(mapStateToProps)(attach(P)(NoteModal));
