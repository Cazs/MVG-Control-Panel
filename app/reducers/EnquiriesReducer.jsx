import { handleActions, combineActions } from 'redux-actions';
import { createSelector } from 'reselect';
import * as Actions from '../actions/enquiries';

const EnquiriesReducer = handleActions(
  {
    [combineActions(
      Actions.getEnquiries,
      Actions.saveEnquiry,
      Actions.saveEnquiryConfigs,
      Actions.updateEnquiry,
      Actions.deleteEnquiry,
      Actions.setEnquiryStatus
    )]: (state, action) => action.payload,
  },
  []
);

export default EnquiriesReducer;

// Selector
const getEnquiriesState = (state) => state.enquiries;

export const getEnquiries = createSelector(
  getEnquiriesState,
  enquiries => enquiries
);
