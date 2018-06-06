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

const AccommodationBookingsMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.ACCOMMODATION_BOOKING_GET_ALL:
    {
      // Get all AccommodationBookings
      return DataManager.getAll(dispatch, action, '/bookings/accommodation', DataManager.db_accommodation_bookings, 'accommodation_bookings')
                        .then(docs => next(Object.assign({}, action, { payload: docs  })));
    }
    case ACTION_TYPES.ACCOMMODATION_BOOKING_NEW:
    {
      const new_accommodationBooking = Object.assign(action.payload, {object_number: getState().accommodationBookings.length});
      // Save to remote store then local store
      return DataManager.put(dispatch, DataManager.db_accommodation_bookings, new_accommodationBooking, '/bookings/accommodation', 'accommodation_bookings')
                        .then(response => 
                          {
                            next({ type: ACTION_TYPES.ACCOMMODATION_BOOKING_NEW, payload: response })
                          });
    }

    case ACTION_TYPES.ACCOMMODATION_BOOKING_UPDATE:
    {
      console.log('accommodationBooking update:', action.payload);
      return DataManager.post(dispatch, DataManager.db_accommodation_bookings, action.payload, '/bookings/accommodation', 'accommodation_bookings')
                        .then(response => next({ type: ACTION_TYPES.ACCOMMODATION_BOOKING_UPDATE, payload: response }));
    }

    /* case ACTION_TYPES.ACCOMMODATION_BOOKING_TASK_ADD:
    {
      console.log('accommodationBooking task add:', action.payload);
      return DataManager.put(dispatch, null, action.payload, '/bookings/accommodation/task', 'accommodationBooking tasks')
                        .then(response => next({ type: ACTION_TYPES.ACCOMMODATION_BOOKING_TASK_ADD, payload: response }));
    }*/

    case ACTION_TYPES.ACCOMMODATION_BOOKING_DELETE:
    {
      return next(action);
    }

    case ACTION_TYPES.ACCOMMODATION_BOOKING_DUPLICATE:
    {
      return next(action);
    }

    case ACTION_TYPES.ACCOMMODATION_BOOKING_SET_STATUS:
    {
      return next(action);
    }

    default: {
      return next(action);
    }
  }
};

export default AccommodationBookingsMW;
