import { combineReducers } from 'redux';

// Generic Reducers
import UIReducer from './UIReducer';
import SettingsReducer from './SettingsReducer';

// Operational Reducers
import UsersReducer from './UsersReducer';
import EnquiriesReducer from './EnquiriesReducer';
import ClientsReducer from './ClientsReducer';
import MaterialsReducer from './MaterialsReducer';
import QuotesReducer from './QuotesReducer';
import TripsReducer from './TripsReducer';
import InvoicesReducer from './InvoicesReducer';

export default combineReducers(
{
  ui: UIReducer,
  settings: SettingsReducer,

  users: UsersReducer,
  materials: MaterialsReducer,
  clients: ClientsReducer,
  quotes: QuotesReducer,
  invoices: InvoicesReducer,
  trips: TripsReducer,
  enquiries: EnquiriesReducer
});