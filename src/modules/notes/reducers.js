import update from 'immutability-helper';

export const initialState = {
  notes: [],
  editableNote: null,
};

export const reducers = {
  setNotes: (state, value) => update(state, {
    notes: { $set: value },
  }),
  setEditableNote: (state, value) => update(state, {
    editableNote: { $set: value },
  }),
};
