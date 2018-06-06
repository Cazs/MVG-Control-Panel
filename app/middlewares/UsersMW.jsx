// Node Libs
import uuidv4 from 'uuid/v4';
import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';

// Helpers
import  * as DataManager from '../helpers/DataManager';

const UsersMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.USER_GET_ALL:
    {
      // Get all Users
      return DataManager.getAll(dispatch, action, '/users', DataManager.db_users, 'users')
                        .then(docs =>
                          next({type: ACTION_TYPES.USER_GET_ALL, payload: docs }))
                        .catch(err =>
                          next({ type: ACTION_TYPES.USER_GET_ALL, payload: []}));
    }

    case ACTION_TYPES.USER_NEW:
    {
      const new_user = Object.assign(action.payload, {object_number: getState().users.length});
      // Save to remote store then local store
      return DataManager.put(dispatch, DataManager.db_users, new_user, '/user', 'users')
                        .then(response =>
                        {
                          const user = Object.assign(action.payload, {_id: response}); // w/ _id
                          next({ type: ACTION_TYPES.USER_NEW, payload: user });
                          if(action.callback)
                            action.callback(user);
                        })
                        .catch(err =>
                          next({ type: ACTION_TYPES.USER_NEW, payload: []}));
    }

    case ACTION_TYPES.USER_UPDATE:
    {
      console.log('user update:', action.payload);
      return DataManager.post(dispatch, DataManager.db_users, action.payload, '/user', 'users')
                        .then(response =>
                          next({ type: ACTION_TYPES.USER_UPDATE, payload: response }))
                        .catch(err =>
                          next({ type: ACTION_TYPES.USER_UPDATE, payload: []}));
    }

    case ACTION_TYPES.USER_DUPLICATE:
    {
      const duplicateUser = Object.assign({}, action.payload,
      {
        created_at: Date.now(),
        _id: uuidv4(),
        _rev: null,
      });
      return dispatch(
      {
        type: ACTION_TYPES.USER_SAVE,
        payload: duplicateUser,
      });
    }

    default: {
      return next(action);
    }
  }
};

export default UsersMW;
