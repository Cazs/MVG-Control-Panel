// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Selectors
import { getUsers } from '../../reducers/UsersReducer';
import { getMaterials } from '../../reducers/MaterialsReducer';
import { getClients } from '../../reducers/ClientsReducer';

// Components
import { Field, Part, Row } from '../../components/shared/Part';
import Button from '../../components/shared/Button';
import { Tab, Tabs, TabContent } from '../../components/shared/Tabs';
import
{
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Tab content Components
import TripBookingsContent from './TripBookingsContent';

// Component
class Bookings extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { visibleTab: 'Trips' };
    this.header_actions = React.createRef();
  }

  // Switch Tab
  changeTab(tabNum)
  {
    this.setState({ visibleTab: tabNum });
  }

  // Render Main Content

  render()
  {
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Bookings | {this.state.visibleTab}</PageHeaderTitle>
          <PageHeaderActions>
            <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
              <Button success onClick={()=>this.props.changeTab('home')}>
                Home
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <TripBookingsContent />
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Bookings.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  materials: PropTypes.arrayOf(PropTypes.object).isRequired,
  clients: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
  users: getUsers(state),
  clients: getClients(state),
  materials: getMaterials(state)
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(Bookings);
