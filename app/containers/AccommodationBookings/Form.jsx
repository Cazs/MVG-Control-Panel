import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Components
import ComboBox from '../../components/shared/ComboBox';
import Button from '../../components/shared/Button';
import CloseButton from '../../components/shared/CloseButton';

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as UIActions from '../../actions/ui';

// Helpers
import  * as DataManager from '../../helpers/DataManager';
import sessionManager from '../../helpers/SessionManager';
import Log from '../../helpers/Logger';

export class AccommodationBookingForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.getAccommodationDestinations = this.getAccommodationDestinations.bind(this);

        this.state = 
        {
          new_booking: newBooking(),
          accommodationDestinations: [],
          is_loading_destinations: true
        }
    }

    getAccommodationDestinations(callback)
    {
      const {setState} = this;
      
      this.props.dispatch(
      {
        type: ACTION_TYPES.ACCOMMODATION_DESTINATION_GET_ALL,
        callback: callback
      });
    }

    render()
    {
        return (
        <div>
          <div
            style={{
              // float: 'left',
              width: '600px',
              backgroundColor: 'rgba(0,0,0,.9)',
              boxShadow: '0px 0px 35px #000',
              borderRadius: '10px',
              zIndex: 100,
              padding: '15px'
            }}
            hidden={!this.props.popover_visible}
          >
          <div style={{paddingTop: '1px', width: '100%'}} >
            <div style={{width: '10px', height: '20px', float: 'right', margin: '-18px -8px 0px 0px'}}>
              <CloseButton
                className="ion-close-circled"
                onClick={() => this.props.setAccommodationBookingFormVisible(false)}
              />
            </div>
          </div>
            <div className='row'>
              <div className='pageItem col-md-6'>
                <label className="itemLabel" style={{color:'#fff'}}>Accommodation Destination: </label>
              </div>
              <div className='pageItem col-md-6'>
                <ComboBox
                  ref={(cbx) => this.cbx_destinations = cbx}
                  items={this.state.accommodationDestinations}
                  label='name'
                  value={this.state.accommodationDestinations ? this.state.accommodationDestinations[0] : ''}
                  onUpdate={(newValue) =>
                  {
                    const booking = this.state.new_booking;
                    booking.accommodation_destination_id = newValue._id;
                    // update UI
                    this.setState({new_booking: booking});
                  }} />
              </div>
            </div>
            <div className="row">
              <div className="pageItem col-md-6">
                <label className="itemLabel" style={{color:'#fff'}}>From</label>
                <input
                  name="date_scheduled"
                  type="date"
                  // value={this.state.new_booking.scheduled_date.getFullYear() + '-' 
                  //   + ((this.state.new_booking.scheduled_date.getMonth()+1) >= 10 ? this.state.new_booking.scheduled_date.getMonth() + 1 : '0' + (this.state.new_booking.scheduled_date.getMonth() + 1)) + '-'
                  //   + (this.state.new_booking.scheduled_date.getDate() >= 10 ? this.state.new_booking.scheduled_date.getDate() : '0' + this.state.new_booking.scheduled_date.getDate())}
                  onChange={(new_val)=>
                  {
                    const booking = this.state.new_booking;
                    
                    booking.scheduled_date = new Date(new_val.currentTarget.value);
                    booking.date_scheduled = booking.scheduled_date.getTime();
                    this.setState({new_booking: booking});
                  }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
              </div>

              <div className="pageItem col-md-6">
                <label className="itemLabel" style={{color:'#fff'}}>Till</label>
                <input
                  name="return_date"
                  type="date"
                  onChange={(new_val)=>
                    {
                      const booking = this.state.new_booking;
                      
                      booking.date_returned = new Date(new_val.currentTarget.value);
                      booking.return_date = booking.date_returned.getTime();
                      this.setState({new_booking: booking});
                    }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
              </div>
            </div>

            <div className="row">
              <div className="pageItem col-md-6">
                <label className="itemLabel" style={{color:'#fff'}}>Number&nbsp;of&nbsp;Adults</label>
                <input
                  id="adult_count"
                  name="adult_count"
                  type="number"
                  value={this.state.new_booking.adult_count}
                  onChange={(new_val)=> {
                        const booking = this.state.new_booking;
                        
                        booking.adult_count = new_val.currentTarget.value;
                        this.setState({new_booking: booking});
                      }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
              </div>

              <div className="pageItem col-md-6">
                <label className="itemLabel" style={{color:'#fff'}}>Number&nbsp;of&nbsp;Children</label>
                <input
                  id="child_count"
                  name="child_count"
                  type="number"
                  value={this.state.new_booking.children_count}
                  onChange={(new_val)=> {
                        const booking = this.state.new_booking;
                        
                        booking.children_count = new_val.currentTarget.value;
                        this.setState({new_booking: booking});
                      }}
                  style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
              </div>
            </div>
            <div className="row">
              <Button
                primary
                style={{width: '140px', height: '60px', marginLeft: '37%'}}
                onClick={()=>
                {
                  this.props.setLoading(true);

                  // TODO: check if user is signed in & authorised
                  if(!this.cbx_destinations.props.value)
                  {
                    this.props.setLoading(false);
                    return this.props.dispatch(UIActions.newNotification('danger', 'Please choose a valid destination from list.'));
                  }

                  if(this.state.new_booking.date_scheduled <= 0)
                  {
                    this.props.setLoading(false);
                    return this.props.dispatch(UIActions.newNotification('danger', 'Invalid check-in date.'));
                  }

                  if(this.state.new_booking.return_date <= 0)
                  {
                    this.props.setLoading(false);
                    return this.props.dispatch(UIActions.newNotification('danger', 'Invalid check-out date.'));
                  }

                  if(this.state.new_booking.return_date < this.state.new_booking.date_scheduled)
                  {
                    this.props.setLoading(false);
                    return this.props.dispatch(UIActions.newNotification('danger', 'Invalid check-out date - cannot be before check-in date.'));
                  }

                  if(this.state.new_booking.adult_count <= 0 && this.state.new_booking.children_count <= 0)
                  {
                      this.props.setLoading(false);
                      return this.props.dispatch(UIActions.newNotification('danger', 'Children or adult count must be greater than 0.'));
                  }

                  // search for destinations (on server) matching criteria
                  if(this.state.is_loading_destinations)
                    this.getAccommodationDestinations((accommodation_destinations) =>
                    {
                      this.setState({accommodationDestinations: accommodation_destinations, is_loading_destinations: false});
                    });
                  
                  this.state.new_booking.accommodation_destination_id = this.cbx_destinations.props.value._id;
                  const context = this;

                  console.log('verbose_info: putting ', this.state.new_booking);
                  // Send request
                  DataManager.put(this.props.dispatch, DataManager.db_accommodation_bookings, this.state.new_booking, '/bookings/accommodation', 'accommodation_bookings')
                              .then(res =>
                              {
                                console.log('response data: ' + res);
                                context.props.setAccommodationBookingFormVisible(false);
                                context.props.dispatch(UIActions.newNotification('success', 'Successfully created your trip booking! We\'ll get back to you soon.'));
                                
                                context.props.setLoading(false);
                              })
                              .catch(err =>
                              {
                                  console.log('error: ', err);
                                  context.props.dispatch(UIActions.newNotification('danger', err.message));
                                  context.props.setLoading(false);
                              });
                }}
              >
                Search
              </Button>
            </div>
          </div>
          <div
            style={{
              // float: 'left',
              width: '600px',
              backgroundColor: 'rgba(0,0,0,.9)',
              boxShadow: '0px 0px 35px #000',
              borderRadius: '10px',
              zIndex: 100,
              padding: '15px'
            }}
            hidden={!this.props.popover_visible}
          >
            <div className="row">
              <div className="pageItem col-lg-4" style={{width: '50px', height: '50px', backgroundColor: 'lime', padding: '5px'}}/>
              <div className="pageItem col-lg-4"/>
              <div className="pageItem col-lg-4"/>
            </div>
          </div>
        </div>);
    }
}

// PropTypes Validation
AccommodationBookingForm.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  setAccommodationBookingFormVisible: PropTypes.func.isRequired
};

export default compose(
  connect(),
  _withFadeInAnimation
)(AccommodationBookingForm);

export const newBooking = () =>
{
  return {
      accommodation_id: null,
      client_id: null,
      date_scheduled: 0,
      return_date: 0,
      adult_count: 0,
      children_count: 0,
      creator: sessionManager.getSessionUser() ? sessionManager.getSessionUser().usr : null,
      authoriser: null,
      status: 0,
      date_logged: new Date().getTime(),
      notes: null
  }
}