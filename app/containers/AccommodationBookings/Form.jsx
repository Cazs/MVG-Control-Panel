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
import * as DataManager from '../../helpers/DataManager';
import sessionManager from '../../helpers/SessionManager';
import Log from '../../helpers/Logger';

export class AccommodationBookingForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.getAllAccommodationDestinations = this.getAllAccommodationDestinations.bind(this);
        this.filter_container = {};// React.createRef();

        this.state = 
        {
          new_booking: newBooking(),
          accommodationDestinations: [],
          is_loading_destinations: true,
          selected_filters:[]
        }
    }

    getAllAccommodationDestinations(callback)
    {
      const {setState} = this;
      
      this.props.dispatch(
      {
        type: ACTION_TYPES.ACCOMMODATION_DESTINATION_GET_ALL,
        callback: callback
      });
    }

    componentDidUpdate()
    {
      if(this.filters_container)
        if(this.filters_container.childElementCount > 0)
          // Note: {behavior: 'smooth', block: 'end'} is currently not supported in Safari WebKit, but since this is Electron ... */
          this.filters_container.lastElementChild.scrollIntoView({behavior: 'smooth'});
    }

    render()
    {
      const filters = ['name', 'description', 'cost_per_night_adults', 'cost_per_night_children', 'country', 'state_province', 'city', 'town', 'street', 'unit_number', 'zip_code', 'rating'];

      return (
        <div>
          {/* Filters container */}
          <div
            style={{
              float: 'right',
              width: '600px',
              backgroundColor: 'rgba(0,0,0,.9)',
              boxShadow: '0px 0px 35px #000',
              borderRadius: '10px',
              zIndex: 100,
              padding: '15px',
              margin: '-120px 0px 0px 0px'
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
            <h1 style={{textAlign: 'center', color: '#fff'}}>Accommodation Search</h1>
            <h2 style={{textAlign: 'center', color: '#fff'}}>Filters</h2>
            {/* Filters Container */}
            <div
              ref={filters_container => this.filters_container = filters_container}
              className='row'
              style={{
                border: '1px solid #fff',
                borderRadius: '5px',
                maxHeight: '170px',
                overflowY: 'scroll',
                boxShadow: 'inset 0px 0px 15px #fff'
                // background: 'radial-gradient(#343434, #3c3c3c 70%);'
              }}
            >
              {
                this.state.selected_filters.map((filter, index) =>
                (<div
                  key={filter.name+'_'+filter.value}
                  className='pageItem col-md-6'
                  style={{
                    background: 'rgba(255,255,255,.7)',
                    borderRadius: '5px',
                    border: '5px solid #343434',
                    padding: '5px',
                    marginTop: '15px'
                  }}
                  ref={elem => this.filter_container[filter.name+'_'+filter.value] = elem}
                  >
                  {/* Close Button Container */}
                  <div style={{paddingTop: '1px', width: '100%'}} >
                    <div style={{
                      width: '10px',
                      height: '20px',
                      float: 'right',
                      margin: '-11px -0px 0px 0px'
                      }}
                    >
                      <CloseButton
                        className="ion-close-circled"
                        onClick={() =>
                          {
                            console.log('selected filters BEFORE removal: ', this.state.selected_filters);

                            // let i = this.state.selected_filters.indexOf(filter);
                            // delete this.state.selected_filters[i];
                            let selected_filters = this.state.selected_filters.slice(); // get copy of selected filters array
                            selected_filters.splice(index, 1); // remove current filter from array
                            // update the real array
                            this.setState({selected_filters});

                            console.log('selected filters AFTER removal: ', this.state.selected_filters);
                          }}
                      />
                    </div>
                  </div>
                  {/* Filter inputs */}
                  <ComboBox
                    items={filters}
                    style={{paddingTop: '10px'}}
                    value={filter.name}
                    onUpdate={newValue =>
                    {
                      filter.name = newValue;
                    }} />
                  <input 
                    type='text'
                    style={{marginTop: '10px'}}
                    defaultValue={filter.value}
                    onChange={(event)=> filter.value = event.currentTarget.value}
                  />
                </div>))
              }
            </div>
            <div className="row">
              <button
                className="btn btn-primary"
                style={{width: '175px', height: '50px', margin: '15px auto 0px auto'}}
                onClick={event => 
                {
                  let selected_filters = this.state.selected_filters.slice();

                  var i = 0;
                  let new_filter =
                  {
                    name: filters[i], // TODO: choose unused filter
                    value: ''
                  }
                  // if user chose filter that's already been added, try look for one that hasn't been used
                  while(selected_filters.filter(filter => filter.name === new_filter.name).length > 0)
                  {
                    if(i+1 < filters.length)
                      i++;
                    else break;
                    new_filter.name = filters[i];
                    console.log('filter has been used, trying filter: ', new_filter);
                  }

                  console.log('settled on filter: ', new_filter);

                  if(selected_filters.filter(filter => filter.name === new_filter.name).length == 0) // if filter not added yet
                  {
                    selected_filters.push(new_filter); // add it
                    this.setState({selected_filters}); // update UI
                  } else alert('filter already exists in list.');
                }}
              >
                <span className="ion-plus"/>
                Add Search Filter
              </button>
            </div>
            <div className="row">
              <div className="pageItem col-md-6">
                <label className="itemLabel" style={{color:'#fff'}}>Check-in</label>
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
                <label className="itemLabel" style={{color:'#fff'}}>Check-out</label>
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
              <button
                className="btn btn-success"
                style={{width: '140px', height: '60px', marginLeft: '37%'}}
                onClick={()=>
                {
                  this.props.setLoading(true);

                  /*if(!this.state.selected_filters.length > 0)
                  {
                    this.props.setLoading(false);
                    return this.props.dispatch(UIActions.newNotification('danger', 'Please choose at least one valid search filter'));
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
                  }*/

                  const context = this;

                  // search for destinations (on server) matching criteria/filters
                  const encoded_filters = this.state.selected_filters.map(filter => filter.name + '=' + encodeURI(filter.value)).join('\+');
                  console.log('encoded filter:', encoded_filters);
                  // Send request
                  DataManager.get('/destinations/'+encoded_filters)
                              .then(res =>
                              {
                                context.props.setLoading(false);
                                console.log('response data: ', res);
                                if(res)
                                {
                                  if(Array.isArray(res.data)) // if using searchAccommodations server API, i.e. searching with filters
                                    context.setState(
                                    {
                                      accommodationDestinations: res.data,
                                      is_loading_destinations: false
                                    });
                                  else if(res.data && res.data._embedded)// else if using hypermedia responses (i.e. getAll AccommodationDestinations), extract data
                                    context.setState(
                                    {
                                      accommodationDestinations: res.data._embedded.accommodation_destinations,
                                      is_loading_destinations: false
                                    });
                                  else console.log('error: invalid server response.');
                                } else console.log('error: invalid server response.');
                                console.log('destinations: ', this.state.accommodationDestinations);
                                // context.props.setAccommodationBookingFormVisible(false);
                                // context.props.dispatch(UIActions.newNotification('success', 'Successfully created your trip booking! We\'ll get back to you soon.'));
                              })
                              .catch(err =>
                              {
                                context.props.setLoading(false);
                                console.log('error: ', err);
                                context.props.dispatch(UIActions.newNotification('danger', 'Error: ' + err.message));
                              });
                }}
              >
                Search
              </button>
            </div>
          </div>
          {/* Destinations container */}
          <div
            style={{
              float: 'left',
              width: '500px',
              maxHeight: '550px',
              overflowY: 'scroll',
              backgroundColor: 'rgba(0,0,0,.9)',
              boxShadow: '0px 0px 35px #000',
              borderRadius: '10px',
              border: '2px solid #fff',
              zIndex: 100,
              padding: '15px',
              margin: '-120px 20px 0px 0px'
            }}
            hidden={!this.props.popover_visible || this.state.accommodationDestinations.length == 0}
          >
            <div className="row">
              {this.state.accommodationDestinations.map(destination =>
              (
                <div
                  className="pageItem col-lg-12"
                  style={{
                    
                  }}
                >
                  <div style={{
                    width: '90%',
                    borderRadius: '5px',
                    border: '2px solid #3c3c3c',
                    background: 'rgba(255,255,255,.4)',
                    padding: '5px',
                    margin: 'auto'
                    }}>
                    <label className="itemLabel" style={{color:'#fff', textAlign: 'center'}}>Name: {destination.name}</label>
                    <p style={{textAlign: 'center', color: '#3c3c3c'}}>&quot;{destination.description}&quot;</p>
                    <p style={{color:'#000', textAlign: 'center', textDecoration: 'underline'}}>Cost per night</p>
                    <label className="itemLabel" style={{color:'#fff'}}>Adults: {destination.currency}&nbsp;{destination.cost_per_night_adults}</label>
                    <label className="itemLabel" style={{color:'#fff'}}>Children: {destination.currency}&nbsp;{destination.cost_per_night_children}</label>
                    <label className="itemLabel" style={{color:'#fff'}}>Address:</label>
                    <p style={{textAlign: 'left', color: '#3c3c3c'}}>
                      {destination.unit_number}&nbsp;{destination.street}, 
                       {destination.town}, {destination.city}, {destination.state_province}, 
                      <br />
                      {destination.country}
                      <br />
                      {destination.zip_code}
                    </p>
                    <label className="itemLabel" style={{color:'#fff'}}>Rating: {destination.rating}</label>
                    <button className="btn btn-success" style={{width: '120px', height: '50px', margin: '0px 0px 0px 34%'}}>
                      Book
                    </button>
                  </div>
                </div>
              ))}
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