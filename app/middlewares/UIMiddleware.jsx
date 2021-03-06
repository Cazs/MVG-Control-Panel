import * as ACTION_TYPES from '../constants/actions.jsx';
import sounds from '../../libs/sounds';
import uuidv4 from 'uuid/v4';

const UIMiddleware = ({ getState }) => next => action =>
{
  switch (action.type) {
    // Changing Tabs
    case ACTION_TYPES.UI_TAB_CHANGE: {
      const currentState = getState();
      const currentTab = currentState.ui.activeTab;
      if (action.payload !== currentTab) {
        sounds.play('TAP');
        next(action);
      }
      break;
    }

    // New Notification
    case ACTION_TYPES.UI_NOTIFICATION_NEW:
    {
      if(action.payload.type !== undefined)
      {
        // Play a sound based on notification type
        switch (action.payload.type) {
          case 'success': {
            sounds.play('SUCCESS');
            break;
          }
          case 'warning': {
            sounds.play('WARNING');
            break;
          }
        }
        // Create a new ID for the notification
        return next(
          Object.assign({}, action, {
            payload: Object.assign({}, action.payload, {
              id: uuidv4(),
            }),
          })
        );
      } else return next(action);
    }

    // Default
    default: {
      return next(action);
    }
  }
};

export default UIMiddleware;
