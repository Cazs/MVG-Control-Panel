import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/trip_bookings';

const TripBookingsReducer = handleActions(
  {
    [combineActions(
      Actions.getTripBookings,
      Actions.saveTripBooking,
      Actions.saveTripBookingConfigs,
      Actions.updateTripBooking,
      Actions.deleteTripBooking,
      Actions.setTripBookingStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default TripBookingsReducer;

// Selector
const getTripBookingsState = (state) => state.tripBookings;

export const getTripBookings = createSelector(
  getTripBookingsState,
  tripBookings => tripBookings
);
