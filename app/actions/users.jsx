import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getUsers = createAction(ACTION_TYPES.USER_GET_ALL);

export const saveUser = createAction(
  ACTION_TYPES.USER_SAVE,
  userData => userData
);

export const duplicateUser = createAction(
  ACTION_TYPES.USER_DUPLICATE,
  (userData) => userData
);

export const deleteUser = createAction(
  ACTION_TYPES.USER_DELETE,
  userID => userID
);

export const editUser = createAction(
  ACTION_TYPES.USER_EDIT,
  userData => userData
);

export const updateUser = createAction(
  ACTION_TYPES.USER_UPDATE,
  updatedUser => updatedUser
);

export const setUserStatus = createAction(
  ACTION_TYPES.USER_SET_STATUS,
  (userID, status) => ({ userID, status })
);

export const saveUserConfigs = createAction(
  ACTION_TYPES.USER_CONFIGS_SAVE,
  (userID, configs) => ({ userID, configs })
);
