import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/accommodation_bookings';

const AccommodationBookingsReducer = handleActions(
  {
    [combineActions(
      Actions.getAccommodationBookings,
      Actions.updateAccommodationBooking,
      Actions.deleteAccommodationBooking,
      Actions.setAccommodationBookingStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default AccommodationBookingsReducer;

// Selector
const getAccommodationBookingsState = (state) => state.accommodationBookings;

export const getAccommodationBookings = createSelector(
  getAccommodationBookingsState,
  accommodationBookings => accommodationBookings
);
