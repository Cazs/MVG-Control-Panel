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
                        .then(docs => next({type: ACTION_TYPES.USER_GET_ALL, payload: docs }));
    }

    case ACTION_TYPES.USER_SAVE:
    {
      // Save doc to db
      // return saveDoc('users', action.payload)
      //   .then(newDocs => {
      //     next({
      //       type: ACTION_TYPES.USER_SAVE,
      //       payload: newDocs,
      //     });
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:user:saved'),
      //       },
      //     });
      //     // Preview Window
      //     ipc.send('preview-user', action.payload);
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.USER_EDIT:
    {
      // Continue
      // return getAllDocs('contacts')
      //   .then(allDocs => {
      //     next(
      //       Object.assign({}, action, {
      //         payload: Object.assign({}, action.payload, {
      //           contacts: allDocs
      //         })
      //       })
      //     );
      //     // Change Tab to Form
      //     dispatch(UIActions.changeActiveTab('form'));
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.USER_DELETE:
    {
      // return deleteDoc('users', action.payload)
      //   .then(remainingDocs => {
      //     next({
      //       type: ACTION_TYPES.USER_DELETE,
      //       payload: remainingDocs,
      //     });
      //     // Send Notification
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:user:deleted'),
      //       },
      //     });
      //     // Clear form if this user is being editted
      //     const { editMode } = getState().form.settings;
      //     if (editMode.active) {
      //       if (editMode.data._id === action.payload) {
      //         dispatch({ type: ACTION_TYPES.FORM_CLEAR });
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
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

    case ACTION_TYPES.USER_UPDATE:
    {
      // return updateDoc('users', action.payload)
      //   .then(docs => {
      //     next({
      //       type: ACTION_TYPES.USER_UPDATE,
      //       payload: docs,
      //     });
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:user:updated'),
      //       },
      //     });
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.USER_CONFIGS_SAVE:
    {
      // const { userID, configs } = action.payload;
      // return getSingleDoc('users', userID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.USER_UPDATE,
      //       payload: Object.assign({}, doc, {configs})
      //     })
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.USER_SET_STATUS:
    {
      // const { userID, status } = action.payload;
      // return getSingleDoc('users', userID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.USER_UPDATE,
      //       payload: Object.assign({}, doc, { status })
      //     })
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    default: {
      return next(action);
    }
  }
};

export default UsersMW;