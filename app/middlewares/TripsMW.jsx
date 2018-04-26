// Node Libs
import uuidv4 from 'uuid/v4';
import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';

// Helpers
import * as DataManager from '../helpers/DataManager';

const TripsMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.TRIP_GET_ALL:
    {
      // Get all Trips
      return DataManager.getAll(dispatch, action, '/trips', DataManager.db_trips, 'trips')
                        .then(docs => next(Object.assign({}, action, { payload: docs  })));
    }
    case ACTION_TYPES.TRIP_NEW:
    {
      const new_trip = Object.assign(action.payload, {object_number: getState().trips.length});
      // Save to remote store then local store
      return DataManager.putRemoteResource(dispatch, DataManager.db_trips, new_trip, '/trip', 'trips')
                        .then(response => 
                          {
                            // next(action);
                            next({ type: ACTION_TYPES.TRIP_NEW, payload: response })
                          });
    }

    case ACTION_TYPES.TRIP_UPDATE:
    {
      console.log('trip update:', action.payload);
      return DataManager.postRemoteResource(dispatch, DataManager.db_trips, action.payload, '/trip', 'trips')
                        .then(response => next({ type: ACTION_TYPES.TRIP_UPDATE, payload: response }));
    }

    case ACTION_TYPES.TRIP_TASK_ADD:
    {
      console.log('trip task add:', action.payload);
      return DataManager.putRemoteResource(dispatch, null, action.payload, '/trip/task', 'trip tasks')
                        .then(response => next({ type: ACTION_TYPES.TRIP_TASK_ADD, payload: response }));
    }

    case ACTION_TYPES.TRIP_SAVE:
    {
      // // Save doc to db
      // return saveDoc('trips', action.payload)
      //   .then(newDocs => {
      //     next({
      //       type: ACTION_TYPES.TRIP_SAVE,
      //       payload: newDocs,
      //     });
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:trip:saved'),
      //       },
      //     });
      //     // Preview Window
      //     ipc.send('preview-trip', action.payload);
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

    case ACTION_TYPES.TRIP_EDIT:
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

    case ACTION_TYPES.TRIP_DELETE:
    {
      // return deleteDoc('trips', action.payload)
      //   .then(remainingDocs => {
      //     next({
      //       type: ACTION_TYPES.TRIP_DELETE,
      //       payload: remainingDocs,
      //     });
      //     // Send Notification
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:trip:deleted'),
      //       },
      //     });
      //     // Clear form if this trip is being editted
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

    case ACTION_TYPES.TRIP_DUPLICATE:
    {
      // const duplicateTrip = Object.assign({}, action.payload, {
      //   created_at: Date.now(),
      //   _id: uuidv4(),
      //   _rev: null,
      // })
      // return dispatch({
      //   type: ACTION_TYPES.TRIP_SAVE,
      //   payload: duplicateTrip,
      // });
    }

    case ACTION_TYPES.TRIP_CONFIGS_SAVE:
    {
      // const { tripID, configs } = action.payload;
      // return getSingleDoc('trips', tripID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.TRIP_UPDATE,
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

    case ACTION_TYPES.TRIP_SET_STATUS:
    {
      // const { tripID, status } = action.payload;
      // return getSingleDoc('trips', tripID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.TRIP_UPDATE,
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

export default TripsMW;
