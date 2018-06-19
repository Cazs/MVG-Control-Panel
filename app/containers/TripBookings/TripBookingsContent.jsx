// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const openDialog = require('../../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;
import { formatDate } from '../../helpers/DateFormatter';

import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';

// Animation
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';
import { Motion, spring } from 'react-motion';
import Transition from 'react-motion-ui-pack'

// Global constants
import * as GlobalConstants from  '../../constants/globals';

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as UIActions from '../../actions/ui';

// Selectors
import { getTripBookings } from '../../reducers/TripBookingsReducer';

// Components
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ComboBox from '../../components/shared/ComboBox';

import Message from '../../components/shared/Message';
import CustomButton, { ButtonsGroup } from '../../components/shared/Button';
import { Field, Part, Row } from '../../components/shared/Part';
import Logo from '../../components/settings/_partials/profile/Logo';

// Styles
import styled from 'styled-components';

// Helpers
import * as SessionManager from '../../helpers/SessionManager';
import Log from '../../helpers/Logger';
import { trip_types } from './Form'; 
import { trip_booking_statuses } from '../../helpers/statuses'; 

import
  {
    PageWrapper,
    PageHeader,
    PageHeaderTitle,
    PageHeaderActions,
    PageContent,
  } from '../../components/shared/Layout';

export class TripBookingsTabContent extends React.Component
{
  constructor(props)
  {
    super(props);
    
    /*this.editBooking = this.editBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.duplicateBooking = this.duplicateBooking.bind(this);
    this.setBookingStatus = this.setBookingStatus.bind(this);*/
    this.date_scheduled_picker = React.createRef();
    this.state = 
    {
      column_toggles_top: -200
    };
  }

  // Load TripBookingsTabContent & add event listeners
  componentDidMount()
  {
    // Add Event Listener
    ipc.on('confirmed-delete-booking', (event, index, bookingId) =>
    {
      if (index === 0)
      {
        this.confirmedDeleteBooking(bookingId);
      }
    });
  }

  // Remove all IPC listeners when unmounted
  componentWillUnmount()
  {
    ipc.removeAllListeners('confirmed-delete-booking');
  }

  // Open Confirm Dialog
  deleteBooking(bookingId)
  {
    openDialog(
      {
        type: 'warning',
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this record?',
        buttons: [
          'Yes',
          'No'
        ],
      },
      'confirmed-delete-booking',
      bookingId
    );
  }

  showBookingPreview(booking)
  {
    // Preview Window
    ipc.send('preview-booking', booking);
  }

  // Confirm Delete an booking
  confirmedDeleteBooking(bookingId)
  {
    const { dispatch } = this.props;
    // dispatch(Actions.deleteBooking(bookingId));
  }

  // set the booking status
  setBookingStatus(bookingId, status)
  {
    alert('set status to: ' + status);
    const { dispatch } = this.props;
    // dispatch(Actions.setBookingStatus(bookingId, status));
  }

  handleBookingUpdate(booking)
  {
    const {dispatch, setLoading} = this.props;
    // if(event.key === 'Enter')
    Log('verbose_info', 'updating booking: ' +  booking);
    dispatch({
      type: ACTION_TYPES.TRIP_BOOKING_UPDATE,
      payload: booking,
      callback(server_response, error)
      {
        setLoading(false);
        if(server_response)
          dispatch(UIActions.newNotification('success', 'Successfully updated trip booking.'));
        else dispatch(UIActions.newNotification('danger', 'Could NOT successfully update trip booking:\n ' + error));
      }
    });
  }

  // Render
  render()
  {
    const { tripBookings } = this.props;

    return (
      <PageContent bare>
        <div style={{maxHeight: 'auto'}}>
            <h2 style={{textAlign: 'center'}}>List of trip bookings</h2>
            <div className='row'>
              {this.props.tripBookings.length === 0 ? (
                <Message danger text='No bookings were found in the system' style={{marginTop: '145px'}} />
              ) : (
                tripBookings.map((tripBooking)=>
                  (<div className='col-lg-6 col-md-12'>
                    <div
                      style={{
                        width: '84%',
                        marginTop: '10px',
                        backgroundColor: 'rgba(0, 0, 0, .5)',
                        minHeight: tripBooking.trip_type === trip_types[1].type_name ? '465px' : '430px',
                        borderRadius: '10px',
                        padding: '6px',
                        border: '2px solid #3c3c3c'
                      }}>
                      <table>
                        <tbody>
                          <tr>
                            <td><p>From:</p></td>
                            <td>
                              <input
                                type='text'
                                value={tripBooking.pickup_location}
                                onChange={(event) =>
                                  {
                                    tripBooking.pickup_location = event.currentTarget.value;
                                    console.log('pickup_location: ', event.currentTarget.value);
                                    this.setState({}); // TODO: update GUI from callback
                                  }}
                                onKeyPress={(event) =>
                                {
                                  if(event.key == 'Enter')
                                  {
                                    this.props.setLoading(true);
                                    // update UI
                                    this.handleBookingUpdate(tripBooking);
                                  }  
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td><p>To:</p></td>
                            <td>
                              <input
                                type='text'
                                value={tripBooking.destination}
                                onChange={(event) =>
                                {
                                  tripBooking.destination = event.currentTarget.value;
                                  console.log('destination: ', event.currentTarget.value);
                                  this.setState({}); // TODO: update GUI from callback
                                }}
                                onKeyPress={(event) =>
                                {
                                  if(event.key == 'Enter')
                                  {
                                    this.props.setLoading(true);
                                    // update UI
                                    this.handleBookingUpdate(tripBooking);
                                  }  
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td><p>Trip Type:</p></td>
                            <td>
                              <ComboBox
                                items={trip_types}
                                label='type_name'
                                value={tripBooking.trip_type}
                                onUpdate={(newValue) =>
                                    {
                                      console.log('selected trip type: ', newValue);

                                      this.props.setLoading(true);
                                      tripBooking.trip_type = newValue;
                                      // update UI
                                      this.setState({}); // TODO: update GUI from callback
                                      this.handleBookingUpdate(tripBooking);
                                    }}
                            />
                            </td>
                            
                          </tr>
                          <tr>
                            <td><p>Date Scheduled:</p></td>
                            <td>
                              <input
                                ref={(date_scheduled_picker)=>this['scheduled_date_'+tripBooking._id] = date_scheduled_picker}
                                type='date'
                                defaultValue={formatDate(new Date(tripBooking.date_scheduled))}
                                onChange={(event) =>
                                  {
                                    this.props.setLoading(true);

                                    if(!event.currentTarget.value)
                                    {
                                      this.props.setLoading(false);
                                      return console.log('Error: Invalid date. Scheduled date has to be in the future.');
                                    }
                                    const new_date = new Date(event.currentTarget.value);

                                    // date picker counts months from 1, Date object counts months from 0, account for that
                                    const derived_date = new Date(new_date.getFullYear(), new_date.getMonth() + 1, new_date.getDate());

                                    if(new_date.getTime() <= new Date().getTime())
                                    {
                                      this.props.setLoading(false);
                                      return this.props.dispatch(UIActions.newNotification('danger', 'Error: date has to be in the future.'));
                                    }

                                    // if is return trip, make sure that scheduled date is <= return date
                                    if(tripBooking.trip_type == trip_types[1].type_name && derived_date.getTime() > new Date(tripBooking.return_date).getTime())
                                    {
                                      this.props.setLoading(false);
                                      return this.props.dispatch(UIActions.newNotification('danger', 'Error: Scheduled date cannot be after the return date.'));
                                    }
                                    
                                    tripBooking.date_scheduled = derived_date.getTime();
                                    this['scheduled_date_'+tripBooking._id].value = formatDate(derived_date);
                                    // update UI
                                    this.setState({}); // TODO: update GUI from callback

                                    this.handleBookingUpdate(tripBooking);
                                  }}
                              />
                            </td>
                          </tr>
                          <tr hidden={tripBooking.trip_type == trip_types[0].type_name}>
                            <td><p>Return Date:</p></td>
                            <td>
                              <input
                                ref={(return_date_picker)=>this['return_date_'+tripBooking._id] = return_date_picker}
                                type='date'
                                defaultValue={formatDate(new Date(tripBooking.return_date))}
                                onChange={(event) =>
                                {
                                  if(!event.currentTarget.value)
                                  {
                                    this.props.setLoading(false);
                                    return console.log('Error: Invalid date. Return date has to be in the future.');
                                  }
                                  const new_date = new Date(event.currentTarget.value);
                                  // date picker counts months from 1, Date object counts months from 0, account for that
                                  const derived_date = new Date(new_date.getFullYear(), new_date.getMonth() + 1, new_date.getDate());
                                  
                                  if(derived_date.getTime() <= new Date().getTime())
                                  {
                                    this.props.setLoading(false);
                                    return this.props.dispatch(UIActions.newNotification('danger', 'Error: date has to be in the future.'));
                                  }

                                  if(derived_date.getTime() < new Date(tripBooking.date_scheduled).getTime())
                                  {
                                    this.props.setLoading(false);
                                    return this.props.dispatch(UIActions.newNotification('danger', 'Error: Return date cannot be before the scheduled date.'));
                                  }
                                  // update state
                                  this.props.setLoading(true);
                                  
                                  tripBooking.return_date = derived_date.getTime();
                                  this['return_date_'+tripBooking._id].value = formatDate(derived_date);
                                  // update UI
                                  this.setState({}); // TODO: update GUI from callback

                                  this.handleBookingUpdate(tripBooking);
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td><p>Adult Count:</p></td>
                            <td>
                              <input
                                type='number'
                                defaultValue={tripBooking.adult_count}
                                onChange={(event) =>
                                  {
                                    console.log('adult count: ', event.currentTarget.value);

                                    this.props.setLoading(true);
                                    tripBooking.adult_count = event.currentTarget.value;
                                    // update UI
                                    this.setState({}); // TODO: update GUI from callback
                                    this.handleBookingUpdate(tripBooking);
                                  }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td><p>Children Count:</p></td>
                            <td>
                              <input
                                type='number'
                                defaultValue={tripBooking.children_count}
                                onChange={(event) =>
                                  {
                                    console.log('children count: ', event.currentTarget.value);

                                    this.props.setLoading(true);
                                    tripBooking.children_count = event.currentTarget.value;
                                    // update UI
                                    this.setState({}); // TODO: update GUI from callback
                                    this.handleBookingUpdate(tripBooking);
                                  }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td><p>Date Logged:</p></td>
                            <td><p style={{color: '#fff'}}>{tripBooking.logged_date}</p></td>
                          </tr>
                          <tr>
                            <td><p>Status:</p></td>
                            <td><p style={{color: tripBooking.status == 3 ? 'red' : tripBooking.status == 1 || tripBooking.status == 2 ? 'lime' : '#fff'}}>{trip_booking_statuses[tripBooking.status].status_description}</p></td>
                          </tr>
                        </tbody>
                      </table>
                      <button
                        className='btn btn-success'
                        style={{width: '150px', height: '70px', float: 'left'}}
                        onClick={(event)=>
                        {
                          this.props.setLoading(true);
                          tripBooking.status = trip_booking_statuses[1].status;
                          this.handleBookingUpdate(tripBooking);
                          this.setState({}); // TODO: update GUI from callback
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        className='btn btn-danger'
                        style={{width: '120px', height: '50px', float: 'right'}}
                        onClick={(event)=>
                        {
                          this.props.setLoading(true);
                          tripBooking.status = trip_booking_statuses[3].status;
                          this.handleBookingUpdate(tripBooking);
                          this.setState({}); // TODO: update GUI from callback
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>))
              )}
            </div>
        </div>
      </PageContent>
    );
  }
}

// PropTypes Validation
TripBookingsTabContent.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  // changeTab: PropTypes.func.isRequired,
  tripBookings: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
  tripBookings: getTripBookings(state)
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(TripBookingsTabContent);
