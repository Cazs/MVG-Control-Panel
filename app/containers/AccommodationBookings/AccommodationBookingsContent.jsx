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
import { getAllAccommodationDestinations } from '../../reducers/AccommodationDestinationReducer';
import { getAccommodationBookings } from '../../reducers/AccommodationBookingsReducer';

// Components
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import ComboBox from '../../components/shared/ComboBox';

import Message from '../../components/shared/Message';
import CustomButton, { ButtonsGroup } from '../../components/shared/Button';
import { Field, Part, Row } from '../../components/shared/Part';
import Logo from '../../components/settings/_partials/profile/Logo';

import Modal from 'react-modal';

// Styles
import styled from 'styled-components';

// Helpers
import * as SessionManager from '../../helpers/SessionManager';
import Log from '../../helpers/Logger';
import { accommodation_booking_statuses } from '../../helpers/statuses'; 

import
  {
    PageWrapper,
    PageHeader,
    PageHeaderTitle,
    PageHeaderActions,
    PageContent,
  } from '../../components/shared/Layout';


const modalStyle =
{
  content :
  {
    top                   : '15%',
    left                  : '7%',
    right                 : 'auto',
    bottom                : 'auto',
    border                : '2px solid black',
    minWidth              : window.outerWidth-160, // '950px'
  }
};

export class AccommodationBookingsTabContent extends React.Component
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

  // Load AccommodationBookingsTabContent & add event listeners
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
    setLoading(true);
    // if(event.key === 'Enter')
    Log('verbose_info', 'updating booking: ' +  booking);
    dispatch(
    {
      type: ACTION_TYPES.ACCOMMODATION_BOOKING_UPDATE,
      payload: booking,
      callback(server_response, error)
      {
        setLoading(false);
        if(server_response)
          dispatch(UIActions.newNotification('success', 'Successfully updated accommodation booking.'));
        else dispatch(UIActions.newNotification('danger', 'Could NOT successfully update accommodation booking:\n ' + error));
      }
    });
  }

  // Render
  render()
  {
    const accommodationBookings = this.props.accommodationBookings;
    // const { setLoading } = this.props;

    const bookings = Array.from(accommodationBookings).map(accommodationBooking =>
      (<div className='col-lg-6 col-md-12'>
        <div
          style={{
            width: '84%',
            marginTop: '10px',
            backgroundColor: 'rgba(0, 0, 0, .5)',
            minHeight: '480px',
            borderRadius: '10px',
            padding: '6px',
            border: '2px solid #3c3c3c'
          }}>
          <table>
            <tbody>
              <tr>
                <td><p>Accommodation:</p></td>
                <td>
                  <ComboBox
                    items={this.props.accommodationDestinations}
                    label='name'
                    value={accommodationBooking.accommodationDestination ? accommodationBooking.accommodationDestination.name: ' '}
                    onUpdate={(newValue) =>
                    {
                      console.log('selected accommodation: ', newValue);

                      this.props.setLoading(true);
                      accommodationBooking.accommodation_destination_id = newValue;
                      // update UI
                      this.setState({}); // TODO: update GUI from callback
                      this.handleBookingUpdate(accommodationBooking);
                    }}
                />
                </td>
                
              </tr>
              <tr>
                <td><p>From:</p></td>
                <td>
                  <input
                    ref={(date_scheduled_picker)=>this['scheduled_date_'+accommodationBooking._id] = date_scheduled_picker}
                    type='date'
                    defaultValue={formatDate(new Date(accommodationBooking.date_scheduled))}
                    onChange={(event) =>
                      {
                        this.props.setLoading(true);

                        console.log('new scheduled date str: ', event.currentTarget.value);
                        if(!event.currentTarget.value)
                        {
                          this.props.setLoading(false);
                          return console.log('Error: Invalid date. Scheduled date has to be in the future.');
                        }
                        const new_date = new Date(event.currentTarget.value);
                        console.log('new scheduled date: ', new_date);
                        // date picker counts months from 1, Date object counts months from 0, account for that
                        const derived_date = new Date(new_date.getFullYear(), new_date.getMonth() + 1, new_date.getDate());
                        console.log('formatted scheduled date: ', formatDate(derived_date));

                        if(new_date.getTime() <= new Date().getTime())
                        {
                          this.props.setLoading(false);
                          return this.props.dispatch(UIActions.newNotification('danger', 'Error: date has to be in the future.'));
                        }

                        // make sure that scheduled date is <= return date
                        if( derived_date.getTime() > new Date(accommodationBooking.return_date).getTime())
                        {
                          this.props.setLoading(false);
                          return this.props.dispatch(UIActions.newNotification('danger', 'Error: Scheduled date cannot be after the return date.'));
                        }
                        
                        accommodationBooking.date_scheduled = derived_date.getTime();
                        this['scheduled_date_'+accommodationBooking._id].value = formatDate(derived_date);
                        // update UI
                        this.setState({}); // TODO: update GUI from callback

                        this.handleBookingUpdate(accommodationBooking);
                      }}
                  />
                </td>
              </tr>
              <tr>
                <td><p>Till:</p></td>
                <td>
                  <input
                    ref={(return_date_picker)=>this['return_date_'+accommodationBooking._id] = return_date_picker}
                    type='date'
                    defaultValue={formatDate(new Date(accommodationBooking.return_date))}
                    onChange={(event) =>
                      {
                        console.log('new return date str: ', event.currentTarget.value);
                        if(!event.currentTarget.value)
                        {
                          this.props.setLoading(false);
                          return console.log('Error: Invalid date. Return date has to be in the future.');
                        }
                        const new_date = new Date(event.currentTarget.value);
                        console.log('new return date: ', new_date);
                        // date picker counts months from 1, Date object counts months from 0, account for that
                        const derived_date = new Date(new_date.getFullYear(), new_date.getMonth() + 1, new_date.getDate());
                        console.log('formatted return date: ', formatDate(derived_date));
                        
                        if(derived_date.getTime() <= new Date().getTime())
                        {
                          this.props.setLoading(false);
                          return this.props.dispatch(UIActions.newNotification('danger', 'Error: date has to be in the future.'));
                        }

                        if(derived_date.getTime() < new Date(accommodationBooking.date_scheduled).getTime())
                        {
                          this.props.setLoading(false);
                          return this.props.dispatch(UIActions.newNotification('danger', 'Error: Return date cannot be before the scheduled date.'));
                        }
                        // update state
                        this.props.setLoading(true);
                        
                        accommodationBooking.return_date = derived_date.getTime();
                        this['return_date_'+accommodationBooking._id].value = formatDate(derived_date);
                        // update UI
                        this.setState({}); // TODO: update GUI from callback

                        this.handleBookingUpdate(accommodationBooking);
                      }}
                  />
                </td>
              </tr>
              <tr>
                <td><p>Adult Count:</p></td>
                <td>
                  <input
                    type='number'
                    defaultValue={accommodationBooking.adult_count}
                    onChange={(event) =>
                    {
                      console.log('adult count: ', event.currentTarget.value);

                      this.props.setLoading(true);
                      accommodationBooking.adult_count = event.currentTarget.value;
                      // update UI
                      this.setState({}); // TODO: update GUI from callback
                      this.handleBookingUpdate(accommodationBooking);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td><p>Children Count:</p></td>
                <td>
                  <input
                    type='number'
                    defaultValue={accommodationBooking.children_count}
                    onChange={(event) =>
                      {
                        console.log('children count: ', event.currentTarget.value);

                        this.props.setLoading(true);
                        accommodationBooking.children_count = event.currentTarget.value;
                        // update UI
                        this.setState({}); // TODO: update GUI from callback
                        this.handleBookingUpdate(accommodationBooking);
                      }}
                  />
                </td>
              </tr>
              <tr>
                <td><p>Date Logged:</p></td>
                <td><p style={{color: '#fff'}}>{accommodationBooking.logged_date}</p></td>
              </tr>
              <tr>
                <td><p>Status:</p></td>
                <td><p style={{color: accommodationBooking.status == 3 ? 'red' : accommodationBooking.status == 1 || accommodationBooking.status == 2 ? 'lime' : '#fff'}}>{accommodation_booking_statuses[accommodationBooking.status].status_description}</p></td>
              </tr>
            </tbody>
          </table>
          <button
            className='btn btn-success'
            style={{width: '150px', height: '70px', float: 'left'}}
            onClick={(event)=>
            {
              // this.props.setLoading(true);
              accommodationBooking.status = accommodation_booking_statuses[1].status;
              this.handleBookingUpdate(accommodationBooking);
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
              // this.props.setLoading(true);
              accommodationBooking.status = accommodation_booking_statuses[3].status;
              this.handleBookingUpdate(accommodationBooking);
              this.setState({}); // TODO: update GUI from callback
            }}
          >
            Cancel
          </button>
        </div>
    </div>));

    return (
      <PageContent bare>
        <div style={{maxHeight: 'auto'}}>
            <h2 style={{textAlign: 'center'}}>List of accommodation bookings</h2>
            <div className='row'>
              {
                accommodationBookings.length === 0 ? (
                <Message danger text='No bookings were found in the system' style={{marginTop: '145px'}} />
              ) : bookings}
            </div>
        </div>
      </PageContent>
    );
  }
}

// PropTypes Validation
AccommodationBookingsTabContent.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  // changeTab: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  accommodationBookings: PropTypes.arrayOf(PropTypes.object).isRequired,
  accommodationDestinations: PropTypes.array.isRequired
};

// Map state to props & Export
const mapStateToProps = state => 
{
  return ({
    accommodationBookings: getAccommodationBookings(state),
    accommodationDestinations: getAllAccommodationDestinations(state)
  })
};

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(AccommodationBookingsTabContent);
