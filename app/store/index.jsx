// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import isDev from 'electron-is-dev';

// Root Reducer
import rootReducer from '../reducers';

// 3rd Party Middleware
import Logger from 'redux-logger';

// Common Middleware
import SettingsMW from '../middlewares/SettingsMW';
import UIMiddleware from '../middlewares/UIMiddleware';
import MeasureMW from '../middlewares/MeasureMW';

// Business Logic Related Middleware i.e. glorified event listeners

import UsersMW from '../middlewares/UsersMW';
import ClientsMW from '../middlewares/ClientsMW';
import MaterialsMW from '../middlewares/MaterialsMW';
import TripBookingsMW from '../middlewares/TripBookingsMW';
import AccommodationBookingsMW from '../middlewares/AccommodationBookingsMW';
import AccommodationDestinationMW from '../middlewares/AccommodationDestinationsMW';

const middlewares = 
[
  /* Common Middleware */
  SettingsMW,
  UIMiddleware,
  /* Business Logic Related Middleware */
  UsersMW,
  ClientsMW,
  MaterialsMW,
  TripBookingsMW,
  AccommodationBookingsMW,
  AccommodationDestinationMW
];

// Dev Mode Middlewares
if (isDev)
{
  middlewares.unshift(MeasureMW);
  middlewares.push(Logger);
}

// Redux Devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState)
{
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot)
  {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () =>
    {
      const nextReducer = require('../reducers/index').default;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
