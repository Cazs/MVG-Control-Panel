import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getTripBookings = createAction(ACTION_TYPES.TRIP_BOOKING_GET_ALL);

export const saveTripBooking = createAction(
  ACTION_TYPES.TRIP_BOOKING_SAVE,
  tripBookingData => tripBookingData
);

export const duplicateTripBooking = createAction(
  ACTION_TYPES.TRIP_BOOKING_DUPLICATE,
  (tripBookingData) => tripBookingData
);

export const deleteTripBooking = createAction(
  ACTION_TYPES.TRIP_BOOKING_DELETE,
  tripBookingID => tripBookingID
);

export const editTripBooking = createAction(
  ACTION_TYPES.TRIP_BOOKING_EDIT,
  tripBookingData => tripBookingData
);

export const updateTripBooking = createAction(
  ACTION_TYPES.TRIP_BOOKING_UPDATE,
  updatedTripBooking => updatedTripBooking
);

export const setTripBookingStatus = createAction(
  ACTION_TYPES.TRIP_BOOKING_SET_STATUS,
  (tripBookingID, status) => ({ tripBookingID, status })
);

export const saveTripBookingConfigs = createAction(
  ACTION_TYPES.TRIP_BOOKING_CONFIGS_SAVE,
  (tripBookingID, configs) => ({ tripBookingID, configs })
);
