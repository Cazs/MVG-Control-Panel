import { combineReducers } from 'redux';

// Generic Reducers
import UIReducer from './UIReducer';
import SettingsReducer from './SettingsReducer';

// Business Logic Reducers
import UsersReducer from './UsersReducer';
import ClientsReducer from './ClientsReducer';
import MaterialsReducer from './MaterialsReducer';
import TripsBookingsReducer from './TripBookingsReducer';
import AccommodationBookingsReducer from './AccommodationBookingsReducer';

export default combineReducers(
{
  // Generic Reducers
  ui: UIReducer,
  settings: SettingsReducer,
  // Business Logic Reducers
  users: UsersReducer,
  materials: MaterialsReducer,
  clients: ClientsReducer,
  accommodationBookings: AccommodationBookingsReducer,
  tripBookings: TripsBookingsReducer
});
