import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getTrips = createAction(ACTION_TYPES.TRIP_GET_ALL);

export const saveTrip = createAction(
  ACTION_TYPES.TRIP_SAVE,
  tripData => tripData
);

export const duplicateTrip = createAction(
  ACTION_TYPES.TRIP_DUPLICATE,
  (tripData) => tripData
);

export const deleteTrip = createAction(
  ACTION_TYPES.TRIP_DELETE,
  tripID => tripID
);

export const editTrip = createAction(
  ACTION_TYPES.TRIP_EDIT,
  tripData => tripData
);

export const updateTrip = createAction(
  ACTION_TYPES.TRIP_UPDATE,
  updatedTrip => updatedTrip
);

export const setTripStatus = createAction(
  ACTION_TYPES.TRIP_SET_STATUS,
  (tripID, status) => ({ tripID, status })
);

export const saveTripConfigs = createAction(
  ACTION_TYPES.TRIP_CONFIGS_SAVE,
  (tripID, configs) => ({ tripID, configs })
);
