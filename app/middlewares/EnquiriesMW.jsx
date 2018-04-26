// Node Libs
import uuidv4 from 'uuid/v4';
// import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';

// Helpers
import  * as DataManager from '../helpers/DataManager';

const RequisitionsMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.ENQUIRY_GET_ALL:
    {
      // Get all Requisitions
      return DataManager.getAll(dispatch, action, '/enquiries', DataManager.db_enquiries, 'enquiries')
                        .then(docs => next(Object.assign({}, action, { payload: docs  })));
    }

    case ACTION_TYPES.ENQUIRY_SAVE:
    {
      // Save doc to db
      // return saveDoc('enquiries', action.payload)
      //   .then(newDocs => {
      //     next({
      //       type: ACTION_TYPES.ENQUIRY_SAVE,
      //       payload: newDocs,
      //     });
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:enquiry:saved'),
      //       },
      //     });
      //     // Preview Window
      //     ipc.send('preview-enquiry', action.payload);
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.ENQUIRY_EDIT:
    {
      // Continue
      // return getAllDocs('contacts')
      //   .then(allDocs => {
      //     next(
      //       Object.assign({}, action, {
      //         payload: Object.assign({}, action.payload, {
      //           contacts: allDocs
      //         })
      //       })
      //     );
      //     // Change Tab to Form
      //     dispatch(UIActions.changeActiveTab('form'));
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.ENQUIRY_DELETE:
    {
      // return deleteDoc('enquiries', action.payload)
      //   .then(remainingDocs => {
      //     next({
      //       type: ACTION_TYPES.ENQUIRY_DELETE,
      //       payload: remainingDocs,
      //     });
      //     // Send Notification
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:enquiry:deleted'),
      //       },
      //     });
      //     // Clear form if this enquiry is being editted
      //     const { editMode } = getState().form.settings;
      //     if (editMode.active) {
      //       if (editMode.data._id === action.payload) {
      //         dispatch({ type: ACTION_TYPES.FORM_CLEAR });
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.ENQUIRY_DUPLICATE:
    {
      const duplicateRequisition = Object.assign({}, action.payload,
      {
        created_at: Date.now(),
        _id: uuidv4(),
        _rev: null,
      });
      return dispatch(
      {
        type: ACTION_TYPES.ENQUIRY_SAVE,
        payload: duplicateRequisition,
      });
    }

    case ACTION_TYPES.ENQUIRY_UPDATE:
    {
      // return updateDoc('enquiries', action.payload)
      //   .then(docs => {
      //     next({
      //       type: ACTION_TYPES.ENQUIRY_UPDATE,
      //       payload: docs,
      //     });
      //     dispatch({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'success',
      //         message: i18n.t('messages:enquiry:updated'),
      //       },
      //     });
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.ENQUIRY_CONFIGS_SAVE:
    {
      // const { enquiryID, configs } = action.payload;
      // return getSingleDoc('enquiries', enquiryID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.ENQUIRY_UPDATE,
      //       payload: Object.assign({}, doc, {configs})
      //     })
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    case ACTION_TYPES.ENQUIRY_SET_STATUS:
    {
      // const { enquiryID, status } = action.payload;
      // return getSingleDoc('enquiries', enquiryID)
      //   .then(doc => {
      //     dispatch({
      //       type: ACTION_TYPES.ENQUIRY_UPDATE,
      //       payload: Object.assign({}, doc, { status })
      //     })
      //   })
      //   .catch(err => {
      //     next({
      //       type: ACTION_TYPES.UI_NOTIFICATION_NEW,
      //       payload: {
      //         type: 'warning',
      //         message: err.message,
      //       },
      //     });
      //   });
    }

    default: {
      return next(action);
    }
  }
};

export default RequisitionsMW;
