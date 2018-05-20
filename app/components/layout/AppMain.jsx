// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Components
import Login from '../../containers/Login';
import Signup from '../../containers/Signup';
import Home from '../../containers/Home';
import Enquiries from '../../containers/Enquiries';
import Quotes from '../../containers/Quotes';
// import Trips from '../../containers/Trips';
// import Invoices from '../../containers/Invoices';
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
        {activeTab === 'enquiries' && <Enquiries changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {activeTab === 'quotes' && <Quotes changeTab={this.props.changeTab} setLoading={this.props.setLoading} />}
        {/* {activeTab === 'trips' && <Trips />} */}
        {/* {activeTab === 'invoices' && <Invoices />} */}
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
