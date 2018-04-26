// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const ipc = require('electron').ipcRenderer;

/* Actions */
import * as UIActions from './actions/ui';
import * as SettingsActions from './actions/settings';
import * as UserActions from './actions/users';
import * as ClientActions from './actions/clients';
import * as MaterialActions from './actions/materials';
import * as QuoteActions from './actions/quotes';
import * as TripActions from './actions/trips';
import * as InvoiceActions from './actions/invoices';
import * as EnquiryActions from './actions/enquiries';

// Components
import AppNav from './components/layout/AppNav';
import AppMain from './components/layout/AppMain';
import AppNotification from './components/layout/AppNotification';
// import AppUpdate from './components/layout/AppUpdate';
import { AppWrapper } from './components/shared/Layout';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ComboBox from './components/shared/ComboBox';

// Components
class App extends PureComponent
{
  constructor(props)
  {
    super(props);
    this.changeTab = this.changeTab.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidMount()
  {
    const { dispatch } = this.props;
    dispatch(SettingsActions.getInitalSettings());
    
    // Get User data
    dispatch(UserActions.getUsers());

    // Get Operational data
    // dispatch(EnquiryActions.getEnquiries());
    // dispatch(ClientActions.getClients());
    // dispatch(MaterialActions.getMaterials());
    // dispatch(QuoteActions.getQuotes());
    // dispatch(TripActions.getTrips());
    // dispatch(InvoiceActions.getInvoices());
    
    this.changeTab('home');
    // Add Event Listener
    ipc.on('menu-change-tab', (event, tabName) => this.changeTab(tabName));
    // Save configs to invoice
    ipc.on('save-configs-to-invoice', (event, invoiceID, configs) => {});
  }

  componentWillUnmount()
  {
    ipc.removeAllListeners(
    [
      'menu-change-tab',
      'menu-form-save',
      'menu-form-clear',
      'menu-form-add-item',
      'menu-form-toggle-dueDate',
      'menu-form-toggle-currency',
      'menu-form-toggle-discount',
      'menu-form-toggle-vat',
      'menu-form-toggle-note',
      'menu-form-toggle-settings',
      // Save template configs to invoice
      'save-configs-to-invoice'
    ]);
  }

  changeTab(tabName)
  {
    const { dispatch } = this.props;
    dispatch(UIActions.changeActiveTab(tabName));
  }

  removeNotification(id)
  {
    const { dispatch } = this.props;
    dispatch(UIActions.removeNotification(id));
  }

  render()
  {
    const { activeTab, notifications, checkUpdatesMessage } = this.props.ui;
    return (
      <AppWrapper>
        { activeTab !== 'home' ?
          <AppNav activeTab={activeTab} changeTab={this.changeTab} /> : 
          <div /> }
        <AppNotification notifications={notifications} removeNotification={this.removeNotification} />
        <AppMain activeTab={activeTab} changeTab={this.changeTab} />
      </AppWrapper>
    );
  }
}

App.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  ui: PropTypes.shape(
  {
    activeTab: PropTypes.string.isRequired,
    notifications: PropTypes.array.isRequired
  }).isRequired
};

export default connect(state =>
(
  {
    ui: state.ui
  }
))(App);
