// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import Home from '../../containers/Home';
import TripBookings from '../../containers/TripBookings';
import AccommodationBookings from '../../containers/AccommodationBookings';
// import TripHistory from '../../containers/Trips';
// import AccommodationHistory from '../../containers/Invoices';
// import Messages from '../../containers/Messages';
import Settings from '../../containers/Settings';

// Layout
import { AppMainContent } from '../shared/Layout';

class AppMain extends Component
{
  shouldComponentUpdate(nextProps)
  {
    return this.props.activeTab !== nextProps.activeTab;
  }

  render()
  {
    const { activeTab, changeTab } = this.props;    
    return (
      <AppMainContent>
        {activeTab === 'signup' && <Signup changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {activeTab === 'login' && <Login changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {activeTab === 'home' && <Home changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {activeTab === 'trip-bookings' && <TripBookings changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {activeTab === 'accommodation-bookings' && <AccommodationBookings changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {/* {activeTab === 'trip-history' && <TripHistory />} */}
        {/* {activeTab === 'accommodation-history' && <AccommodationHistory />} */}
        {/* {activeTab === 'messages' && <Messages />} */}
        {activeTab === 'settings' && <Settings setLoading={this.props.setLoading} />}
      </AppMainContent>
    );
  }
}

AppMain.propTypes =
{
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired
};

export default AppMain;
