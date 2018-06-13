import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/accommodation_destinations';

const AccommodationDestinationsReducer = handleActions(
  {
    [combineActions(
      Actions.getAccommodationDestinations,
      Actions.updateAccommodationDestination,
      Actions.deleteAccommodationDestination,
      Actions.setAccommodationDestinationStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default AccommodationDestinationsReducer;

// Selector
const getAccommodationDestinationsState = (state) => state.accommodationDestinations;

export const getAccommodationDestinations = createSelector(
  getAccommodationDestinationsState,
  accommodationDestinations => accommodationDestinations
);
