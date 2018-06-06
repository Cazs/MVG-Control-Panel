import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getAccommodationBookings = createAction(ACTION_TYPES.ACCOMMODATION_BOOKING_GET_ALL);

export const duplicateAccommodationBooking = createAction(
  ACTION_TYPES.ACCOMMODATION_BOOKING_DUPLICATE,
  (accommodationBookingData) => accommodationBookingData
);

export const deleteAccommodationBooking = createAction(
  ACTION_TYPES.ACCOMMODATION_BOOKING_DELETE,
  accommodationBookingID => accommodationBookingID
);

export const updateAccommodationBooking = createAction(
  ACTION_TYPES.ACCOMMODATION_BOOKING_UPDATE,
  updatedAccommodationBooking => updatedAccommodationBooking
);

export const setAccommodationBookingStatus = createAction(
  ACTION_TYPES.ACCOMMODATION_BOOKING_SET_STATUS,
  (accommodationBookingID, status) => ({ accommodationBookingID, status })
);
