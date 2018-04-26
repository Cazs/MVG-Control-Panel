import * as ACTION_TYPES from '../constants/actions.jsx';
import { createAction } from 'redux-actions';

export const getEnquiries = createAction(ACTION_TYPES.ENQUIRY_GET_ALL);

export const saveEnquiry = createAction(
  ACTION_TYPES.ENQUIRY_SAVE,
  enquiryData => enquiryData
);

export const duplicateEnquiry = createAction(
  ACTION_TYPES.ENQUIRY_DUPLICATE,
  (enquiryData) => enquiryData
);

export const deleteEnquiry = createAction(
  ACTION_TYPES.ENQUIRY_DELETE,
  enquiryID => enquiryID
);

export const editEnquiry = createAction(
  ACTION_TYPES.ENQUIRY_EDIT,
  enquiryData => enquiryData
);

export const updateEnquiry = createAction(
  ACTION_TYPES.ENQUIRY_UPDATE,
  updatedEnquiry => updatedEnquiry
);

export const setEnquiryStatus = createAction(
  ACTION_TYPES.ENQUIRY_SET_STATUS,
  (enquiryID, status) => ({ enquiryID, status })
);

export const saveEnquiryConfigs = createAction(
  ACTION_TYPES.ENQUIRY_CONFIGS_SAVE,
  (enquiryID, configs) => ({ enquiryID, configs })
);
