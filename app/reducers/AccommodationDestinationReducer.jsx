import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/accommodation_destinations';

const AccommodationDestinationsReducer = handleActions(
  {
    [combineActions(
      Actions.getAllAccommodationDestinations,
      Actions.updateAccommodationDestination,
      Actions.deleteAccommodationDestination,
      Actions.setAccommodationDestinationStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default AccommodationDestinationsReducer;

// Selector
const getAllAccommodationDestinationsState = (state) => state.accommodationDestinations;

export const getAllAccommodationDestinations = createSelector(
  getAllAccommodationDestinationsState,
  accommodationDestinations => accommodationDestinations
);
