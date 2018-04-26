import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/users';

const UsersReducer = handleActions(
  {
    [combineActions(
      Actions.getUsers,
      Actions.saveUser,
      Actions.saveUserConfigs,
      Actions.updateUser,
      Actions.deleteUser,
      Actions.setUserStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default UsersReducer;

// Selector
const getUsersState = (state) => state.users;

export const getUsers = createSelector(
  getUsersState,
  users => users
);
