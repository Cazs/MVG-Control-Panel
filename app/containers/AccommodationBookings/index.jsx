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
import { getAllAccommodationDestinations } from '../../reducers/AccommodationDestinationReducer';

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
import AccommodationBookingsContent from './AccommodationBookingsContent';
import Modal from 'react-modal';

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as UIActions from '../../actions/ui';

// Helpers
import * as SessionManager from '../../helpers/SessionManager';
import Log from '../../helpers/Logger';
import * as GlobalConstants from  '../../constants/globals';
import { formatDate } from '../../helpers/DateFormatter';
const centerOnPrimaryDisplay = require('../../../helpers/center-on-primary-display');

const modalStyle =
{
  content :
  {
    top                   : '15%',// centerOnPrimaryDisplay(window.innerWidth, 620).y,
    left                  : '7%', // centerOnPrimaryDisplay(window.innerWidth, 620).x,
    right                 : 'auto',
    bottom                : 'auto',
    border                : '2px solid black',
    minWidth              : window.outerWidth-160, // '950px'
  }
};

// Component
class Bookings extends Component
{
  constructor(props)
  {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.newDestination = this.newDestination.bind(this);

    this.state =
    {
      is_new_destinaton_modal_open: false,
      new_destination: this.newDestination()
    };
  }

  newDestination()
  {
    return {
      name: null,
      description: null, // accommodation summary
      cost_per_night_adults: 0.0,
      cost_per_night_children: 0.0,
      country: null,
      state_province: null,
      city: null,
      town: null,
      street: null,
      unit_number: null,
      zip_code: 0,
      status: 1,
      status_description: 'Active',
      gps_coords: null,
      rating: 0,
      other: null
    }
  }

  openModal()
  {
    this.setState({ is_new_destinaton_modal_open: true });
  }
 
  afterOpenModal()
  {
    this.subtitle.style.color = '#2FA7FF';
  }
 
  closeModal()
  {
    this.setState({is_new_destinaton_modal_open: false});
  }

  // Render Main Content

  render()
  {
    const new_accommodation_destination_modal =
    (
      <Modal
        isOpen={this.state.is_new_destinaton_modal_open}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel="New Accommodation Destination Modal"
      >
        <h2 ref={subtitle => this.subtitle = subtitle} style={{color: 'black'}}>Create New Accommodation Destination</h2>
        <div>
          <div className="pageItem">
            {/* <label className="itemLabel">{t('settings:fields:logo:name')}</label>
                  <Logo
                    logo={this.state.logo}
                    handleLogoChange={this.handleLogoChange}
                  /> */}
          </div>
          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Name</label>
              <input
                name="name"
                type="text"
                ref={(txt_name)=>this.txt_name = txt_name}
                onChange={(new_val) =>
                {
                  const destination = this.state.new_destination;
                  destination.name = new_val.currentTarget.value;
                  this.setState({new_destination: destination});
                }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
            <div className="pageItem col-md-6">
              {/*  TODO: Combo box to choose list of countries */}
              <label className="itemLabel">Country</label>
              <input
                name="country"
                type="text"
                ref={(txt_country)=>this.txt_country = txt_country}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                onChange={(new_val) =>
                {
                  const destination = this.state.new_destination;
                  destination.country = new_val.currentTarget.value;
                  this.setState({new_destination: destination});
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">State/Province</label>
              <input
                  ref={(txt_province)=>this.txt_province = txt_province}
                  name="state_province"
                  type="text"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.state_province = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">City</label>
              <input
                name="city"
                type="text"
                ref={(txt_request)=>this.txt_request = txt_request}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                onChange={(new_val) =>
                {
                  const destination = this.state.new_destination;
                  destination.city = new_val.currentTarget.value;
                  this.setState({new_destination: destination});
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Town</label>
              <input
                  ref={(txt_town)=>this.txt_town = txt_town}
                  name="town"
                  type="text"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.town = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">Street</label>
              <input
                  ref={(txt_street)=>this.txt_street = txt_street}
                  name="street"
                  type="text"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.street = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>
          </div>

          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Unit Number</label>
              <input
                  ref={(txt_unit_number)=>this.txt_unit_number = txt_unit_number}
                  name="unit_number"
                  type="text"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.unit_number = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">Zip Code</label>
              <input
                  ref={(txt_zip_code)=>this.txt_zip_code = txt_zip_code}
                  name="zip_code"
                  type="text"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.zip_code = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>
          </div>

          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Rating</label>
              <input
                  ref={(txt_rating)=>this.txt_rating = txt_rating}
                  name="rating"
                  type="number"
                  onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.rating = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">GPS coordinates</label>
              <input
                ref={(txt_gps_coords)=>this.txt_gps_coords = txt_gps_coords}
                name="zip_code"
                type="text"
                onChange={(new_val) =>
                {
                  const destination = this.state.new_destination;
                  destination.gps_coords = new_val.currentTarget.value;
                  this.setState({new_destination: destination});
                }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
          </div>

          <div className='row'>
            <div className="pageItem col-md-6">
              <label className="itemLabel">Cost Per Night (Adults)</label>
              <input
                ref={(txt_cost_per_night_adults)=>this.txt_cost_per_night_adults = txt_cost_per_night_adults}
                name="cost_per_night_adults"
                type="text"
                onChange={(new_val) =>
                {
                  if(Number(new_val.currentTarget.value) >= 0)
                  {
                    const destination = this.state.new_destination;
                    destination.cost_per_night_adults = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  } else this.props.dispatch(UIActions.newNotification('danger', 'Invalid cost.'));
                }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">Cost Per Night (Chidlren)</label>
              <input
                ref={(txt_cost_per_night_children)=>this.txt_cost_per_night_children = txt_cost_per_night_children}
                name="cost_per_night_children"
                type="text"
                onChange={(new_val) =>
                {
                  if(Number(new_val.currentTarget.value) >= 0)
                  {
                    const destination = this.state.new_destination;
                    destination.cost_per_night_children = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  } else this.props.dispatch(UIActions.newNotification('danger', 'Invalid cost.'));
                }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
          </div>

          <div className='row'>
            <div className="pageItem col-lg-12">
              <label className="itemLabel">Summary</label>
              <textarea
                name="accommodation_description"
                onChange={(new_val) =>
                  {
                    const destination = this.state.new_destination;
                    destination.description = new_val.currentTarget.value;
                    this.setState({new_destination: destination});
                  }}
                style={{width: '580px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
          </div>

          <Button
            onClick={this.closeModal}
            style={{width: '120px', height: '50px', float: 'right'}}
            danger
          >Dismiss
          </Button>

          <Button
            onClick={()=>
            {
              if(SessionManager.getSessionUser().access_level <= GlobalConstants.ACCESS_LEVELS[1].level) // standard access & less are not allowed
              {
                return this.props.dispatch(UIActions.newNotification('danger', 'You are not authorised to create accommodation destinations.'));
              }

              this.props.setLoading(true);
              this.setState({is_new_destinaton_modal_open: false});

              const destination = this.state.new_destination;

              if(!destination.name)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid destination name.'));
              }

              if(!destination.country)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid country.'));
              }

              if(!destination.state_province)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid state/province.'));
              }
              
              if(!destination.city)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid city.'));
              }

              if(!destination.street)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid street name.'));
              }

              if(!destination.unit_number)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid unit number.'));
              }

              if(!destination.zip_code)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid zip code.'));
              }

              if(!destination.rating || destination.rating < 0)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid rating.'));
              }
              
              if(!destination.cost_per_night_adults || destination.cost_per_night_adults < 0)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid cost per night for adults.'));
              }
              
              if(!destination.cost_per_night_children || destination.cost_per_night_children < 0)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Invalid cost per night for children.'));
              }
              
              if(!destination.description)
              {
                this.props.setLoading(false);
                this.setState({is_new_destinaton_modal_open: true});
                return this.props.dispatch(UIActions.newNotification('danger', 'Please say a few words about this place.'));
              }

              // Prepare AccommodationDestination
              destination.creator_name = SessionManager.getSessionUser().name;
              destination.creator = SessionManager.getSessionUser().usr;
              destination.creator_user = SessionManager.getSessionUser();
              destination.date_logged = new Date().getTime();// current date in epoch millis
              destination.logged_date = formatDate(new Date()); // current date

              const context = this;
              // dispatch action to create destination on local & remote stores
              this.props.dispatch(
              {
                type: ACTION_TYPES.ACCOMMODATION_DESTINATION_NEW,
                payload: destination,
                // after the destination has been added to local & remote store, push it to the list of destinations
                callback(new_destination, err)// w/ _id
                {
                  if(err)
                  {
                    console.log(err);
                    return context.props.dispatch(UIActions.newNotification('danger', err.message));;
                  }
                  context.props.setLoading(false);
                  context.props.dispatch({type: ACTION_TYPES.ACCOMMODATION_DESTINATION_GET_ALL});
                  // context.props.accommodationDestinations.push(new_destination);
                  context.setState(
                  {
                    new_destination: context.newDestination(),
                    is_new_destinaton_modal_open: false
                  });
                }
              });
            }}
            style={{ width: '120px', height: '50px', float: 'left' }}
            success
          >Create
          </Button>
        </div>
      </Modal>
    );

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Bookings | Accommodation</PageHeaderTitle>
          <PageHeaderActions>
            <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
              <Button primary onClick={()=>this.props.changeTab('home')}>
                Home
              </Button>
              <Button success onClick={()=>this.setState({is_new_destinaton_modal_open: true})}>
                New Accommodation Destination
              </Button>
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          {new_accommodation_destination_modal}
          <AccommodationBookingsContent setLoading={this.props.setLoading} />
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
  setLoading: PropTypes.func.isRequired,
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
