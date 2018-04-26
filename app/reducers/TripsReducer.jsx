import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/trips';

const TripsReducer = handleActions(
  {
    [combineActions(
      Actions.getTrips,
      Actions.saveTrip,
      Actions.saveTripConfigs,
      Actions.updateTrip,
      Actions.deleteTrip,
      Actions.setTripStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default TripsReducer;

// Selector
const getTripsState = (state) => state.trips;

export const getTrips = createSelector(
  getTripsState,
  trips => trips
);
