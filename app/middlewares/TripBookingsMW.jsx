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
import * as SessionManager from '../helpers/SessionManager';

const TripBookingsMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.TRIP_BOOKING_GET_ALL:
    {
      // Get all TripBookings
      return DataManager.getAll(dispatch, action, '/bookings/trips', DataManager.db_trip_bookings, 'trip_bookings')
                        .then(docs => 
                          next(Object.assign({}, action, { payload: docs  })))
                        .catch(err =>
                        {
                          if(action.callback)
                            action.callback(undefined, err);
                            next(action);
                        });
    }
    case ACTION_TYPES.TRIP_BOOKING_NEW:
    {
      const new_tripBooking = Object.assign(action.payload, {
                                            object_number: getState().tripBookings.length,
                                            creator: SessionManager.getSessionUser().usr});
      // Save to remote store then local store
      return DataManager.put(dispatch, DataManager.db_trip_bookings, new_tripBooking, '/bookings/trips', 'trip_bookings')
                        .then(response => 
                        {
                          if(action.callback)
                            action.callback(response);
                          next({ type: ACTION_TYPES.TRIP_BOOKING_NEW, payload: response })
                        })
                        .catch(err =>
                        {
                          if(action.callback)
                            action.callback(undefined, err);
                          next(action);
                        });
    }

    case ACTION_TYPES.TRIP_BOOKING_UPDATE:
    {
      console.log('tripBooking update:', action.payload);
      return DataManager.post(dispatch, DataManager.db_trip_bookings, action.payload, '/bookings/trips', 'trip_bookings')
                        .then(response =>
                          {
                            if(action.callback)
                              action.callback(response);
                            // TODO: update in-memory db here instead of updating by GUI (Containers)
                            next({ type: ACTION_TYPES.TRIP_BOOKING_UPDATE, payload: getState().tripBookings })
                          }).catch(err =>
                          {
                            if(action.callback)
                              action.callback(undefined, err);
                            // next(action);
                            // next(Object.assign({}, action, { payload: action.payload}))
                          });
    }

    /* case ACTION_TYPES.TRIP_BOOKING_TASK_ADD:
    {
      console.log('tripBooking task add:', action.payload);
      return DataManager.put(dispatch, null, action.payload, '/tripBooking/task', 'trip booking detour')
                        .then(response => next({ type: ACTION_TYPES.TRIP_BOOKING_TASK_ADD, payload: response }));
    } */

    case ACTION_TYPES.TRIP_BOOKING_DELETE:
    {
      return next(action);
    }

    case ACTION_TYPES.TRIP_BOOKING_DUPLICATE:
    {
      return next(action);
    }

    case ACTION_TYPES.TRIP_BOOKING_SET_STATUS:
    {
      return next(action);
    }

    default: {
      return next(action);
    }
  }
};

export default TripBookingsMW;
