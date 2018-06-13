// Node Libs
import uuidv4 from 'uuid/v4';
import currencies from '../../libs/currencies.json';
const appConfig = require('electron').remote.require('electron-settings');
const ipc = require('electron').ipcRenderer;

// Actions & Verbs
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';

// Helpers
import * as DataManager from '../helpers/DataManager';
import * as SessionManager from '../helpers/SessionManager';

const AccommodationDestinationsMW = ({ dispatch, getState }) => next => action =>
{
  switch (action.type)
  {
    case ACTION_TYPES.ACCOMMODATION_DESTINATION_GET_ALL:
    {
      // Get all AccommodationDestinations
      return DataManager.getAll(dispatch, action, '/destinations', DataManager.db_accommodation_destinations, 'accommodation_destinations')
                        .then(docs =>
                        {
                          if(action.callback)
                            action.callback(docs);
                          next(Object.assign({}, action, { payload: docs}))
                        })
                        .catch(err =>
                        {
                          if(action.callback)
                            action.callback(undefined, err);
                          next(Object.assign({}, action, { payload: action.payload || [] }));
                        });
    }
    case ACTION_TYPES.ACCOMMODATION_DESTINATION_NEW:
    {
      const new_accommodationDestination = Object.assign(action.payload, {
                                            object_number: getState().accommodationDestinations.length,
                                            creator: SessionManager.getSessionUser().usr});
      // Save to remote store then local store
      return DataManager.put(dispatch, DataManager.db_accommodation_destinations, new_accommodationDestination, '/destination', 'accommodation_destinations')
                        .then(response => 
                        {
                          getState().accommodationDestinations.push(new_accommodationDestination); // TODO: get new obj _id
                          if(action.callback)
                            action.callback(response);
                          next({ type: ACTION_TYPES.ACCOMMODATION_DESTINATION_NEW, payload: response })
                        })
                        .catch(err =>
                        {
                          if(action.callback)
                            action.callback(undefined, err);
                          next(Object.assign({}, action, { payload: action.payload || [] }));
                        });
    }

    case ACTION_TYPES.ACCOMMODATION_DESTINATION_UPDATE:
    {
      return DataManager.post(dispatch, DataManager.db_accommodation_destinations, action.payload, '/destination', 'accommodation_destinations')
                        .then(response =>
                          {
                            if(action.callback)
                              action.callback(response);
                            // TODO: update in-memory db here instead of updating by GUI (Containers)
                            next({ type: ACTION_TYPES.ACCOMMODATION_DESTINATION_UPDATE, payload: getState().accommodationDestinations })
                          }).catch(err =>
                          {
                            if(action.callback)
                              action.callback(undefined, err);
                          });
    }

    case ACTION_TYPES.ACCOMMODATION_DESTINATION_DELETE:
    {
      return next(action);
    }

    case ACTION_TYPES.ACCOMMODATION_DESTINATION_DUPLICATE:
    {
      return next(action);
    }

    case ACTION_TYPES.ACCOMMODATION_DESTINATION_SET_STATUS:
    {
      return next(action);
    }

    default: {
      return next(action);
    }
  }
};

export default AccommodationDestinationsMW;
