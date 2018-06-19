import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getAllAccommodationDestinations = createAction(ACTION_TYPES.ACCOMMODATION_DESTINATION_GET_ALL);

export const duplicateAccommodationDestination = createAction(
  ACTION_TYPES.ACCOMMODATION_DESTINATION_DUPLICATE,
  (accommodationDestinationData) => accommodationDestinationData
);

export const deleteAccommodationDestination = createAction(
  ACTION_TYPES.ACCOMMODATION_DESTINATION_DELETE,
  accommodationDestinationID => accommodationDestinationID
);

export const updateAccommodationDestination = createAction(
  ACTION_TYPES.ACCOMMODATION_DESTINATION_UPDATE,
  updatedAccommodationDestination => updatedAccommodationDestination
);

export const setAccommodationDestinationStatus = createAction(
  ACTION_TYPES.ACCOMMODATION_DESTINATION_SET_STATUS,
  (accommodationDestinationID, status) => ({ accommodationDestinationID, status })
);