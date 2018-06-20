// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Components
import Button from '../../components/shared/Button';
import Slider from '../../components/slideshow/Slider';
import MessageModal from '../../components/shared/MessageModal';
import Modal from 'react-modal';

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import { TripBookingForm } from '../TripBookings/Form';
import { AccommodationBookingForm } from '../AccommodationBookings/Form';

// Selectors
import { getAllAccommodationDestinations } from '../../reducers/AccommodationDestinationReducer';

import
{
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Styles
import styled from 'styled-components';

const Profile = styled.div`
float: left;
width: 90px;
height: 115%;
background: url(../static/images/profile_minimal.png);
background-size: fill;
background-repeat: no-repeat;
&:hover
{
  background: url(../static/images/profile.png);
  background-size: fill;
  background-repeat: no-repeat;
}
`;

require('./home-style.css');

const images = [
  '../static/images/slider/1.jpg',
  '../static/images/slider/2.jpg',
  '../static/images/slider/3.jpg',
];

const centerOnPrimaryDisplay = require('../../../helpers/center-on-primary-display');

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

// Component
class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.setTripBookingFormVisible = this.setTripBookingFormVisible.bind(this);
    this.setAccommodationBookingFormVisible = this.setAccommodationBookingFormVisible.bind(this);
    this.showMessageDialog = this.showMessageDialog.bind(this);

    this.state =
    {
      trip_booking_popover_visible: false,
      accommodation_booking_popover_visible: false,
      message_dialog_visible: false,

      profile_menu_visible: false,

      new_message:
      {
        subject: null,
        message: null,
        receiver: null,
        creator: null,
        date_logged: new Date().getTime()
      }
    };
  }

  setTripBookingFormVisible(val)
  {
    this.setState(
      {
        trip_booking_popover_visible: val,
        accommodation_booking_popover_visible: false
      });
  }

  setAccommodationBookingFormVisible(val)
  {
    this.setState(
      {
        accommodation_booking_popover_visible: val,
        trip_booking_popover_visible: false
      });
  }

  showMessageDialog()
  {
    this.setState({message_dialog_visible: true});
  }

  openModal()
  {
    this.setState({ is_modal_open: true });
  }
  
  afterOpenModal()
  {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#2FA7FF';
  }
  
  closeModal()
  {
    this.setState({is_modal_open: false});
  }

  // Render Main Content

  render()
  {
    const msg_modal = (
      <Modal
        isOpen={this.state.message_dialog_visible}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={modalStyle}
        contentLabel="New Message"
      >
        <h2 ref={subtitle => this.subtitle = subtitle} style={{color: 'black'}}>New Message</h2>
        <div>
            <div className="row">
                <div className="pageItem col-sm-12">
                <label className="itemLabel">To:</label>
                <input
                    ref={(txt_subject)=>this.txt_subject = txt_subject}
                    name="recipient"
                    type="text"
                    onChange={(new_val)=>
                        {
                        const message = this.state.new_message;
                        message.subject = new_val.currentTarget.value;

                        this.setState({new_message: message});
                        }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
                </div>
            </div>
            <div className="row">
                <div className="pageItem col-sm-12">
                <label className="itemLabel">Subject</label>
                <input
                    ref={(txt_subject)=>this.txt_subject = txt_subject}
                    name="subject"
                    type="text"
                    onChange={(new_val)=>
                        {
                        const message = this.state.new_message;
                        message.subject = new_val.currentTarget.value;

                        this.setState({new_message: message});
                        }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                />
                </div>
            </div>

            <div className="row">
                <div className="pageItem col-sm-12">
                    <label className="itemLabel">Message</label>
                    <textarea
                        name="message"
                        ref={(txt_message)=>this.txt_message = txt_message}
                        onChange={(new_val)=>
                            {
                                const message = this.state.new_message;
                                message.message = new_val.currentTarget.value;
                                this.setState({new_message: message});
                            }}
                        style={{border: '1px solid #2FA7FF', borderRadius: '3px', width: '100%'}}
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
              if(sessionManager.getSessionUser().access_level <= GlobalConstants.ACCESS_LEVELS[1].level) // standard access & less are not allowed
              {
                this.props.dispatch(
                {
                  type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  payload: {type: 'danger', message: 'You are not authorised to create quotes.'}
                });
                return;
              }

              this.props.setLoading(true);
              this.setState({is_new_quote_modal_open: false});

              const quote = this.state.new_quote;

              if(!quote.client)
              {
                this.props.setLoading(false);
                this.setState({is_new_quote_modal_open: true});
                return this.props.dispatch(
                {
                  type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  payload:
                  {
                    type: 'danger',
                    message: 'Invalid client selected'
                  }
                });
              }

              if(!quote.contact)
              {
                this.props.setLoading(false);
                this.setState({is_new_quote_modal_open: true});

                return this.props.dispatch(
                {
                  type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  payload:
                  {
                    type: 'danger',
                    message: 'Invalid contact person selected'
                  }
                });
              }

              if(!quote.sitename)
              {
                this.props.setLoading(false);
                this.setState({is_new_quote_modal_open: true});
                
                return this.props.dispatch(
                {
                  type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  payload:
                  {
                    type: 'danger',
                    message: 'Invalid sitename'
                  }
                });
              }
              
              if(!quote.request)
              {
                this.props.setLoading(false);
                this.setState({is_new_quote_modal_open: true});

                return this.props.dispatch(
                {
                  type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  payload:
                  {
                    type: 'danger',
                    message: 'Error: Invalid quote description',
                  },
                });
              }

              // Prepare Quote
              const client_name = quote.client.client_name.toString();
              quote.object_number = this.props.quotes.length;
              quote.client_name = client_name;
              quote.client_id = quote.client._id;
              quote.contact_person = quote.contact.name;
              quote.contact_person_id = quote.contact.usr;
              quote.status = statuses[0].status;
              quote.status_description = statuses[0].status_description;
              quote.revision = 1;
              quote.account_name = client_name.toLowerCase().replace(' ', '-');
              quote.creator_name = sessionManager.getSessionUser().name;
              quote.creator = sessionManager.getSessionUser().usr;
              quote.creator_employee = sessionManager.getSessionUser();
              quote.date_logged = new Date().getTime();// current date in epoch millis
              quote.logged_date = formatDate(new Date()); // current date

              const context = this;
              // dispatch action to create quote on local & remote stores
              this.props.dispatch(
              {
                type: ACTION_TYPES.QUOTE_NEW,
                payload: quote,
                // after the quote has been added to local & remote store, push it to the table
                callback(new_quote)// w/ _id
                {
                  context.props.setLoading(false);
                  context.setState({is_new_quote_modal_open: false});
                  context.props.quotes.push(new_quote);
                  context.setState({new_quote: context.newQuote(), is_new_quote_modal_open: false});
                }
              });
            }}
            style={{width: '120px', height: '50px', float: 'left'}}
            success
          >Send
          </Button>
        </div>
      </Modal>);

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>MVG&nbsp;|&nbsp;Home</PageHeaderTitle>
          <PageHeaderActions ref={this.header_actions}>
            <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
              {/* <Button primary>
                New Enquiry
              </Button> */}
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          {/* Nav Bar */}
          <div
            style={{
              position: 'fixed',
              width: '100%',
              height: '80px',
              left: '0px',
              backgroundColor: 'rgba(0,0,0,.4)',
              zIndex: 100
            }}
          >
            <Profile style={{marginTop: '-7px'}} onClick={()=>this.setState({profile_menu_visible: !this.state.profile_menu_visible})} />
            <label style={{fontSize: '26pt', marginLeft: '30px', marginTop: '15px', color: '#fff'}}>John Doe</label>
            <div style={{backgroundColor: 'lime'}}>
              <div style={{
                width: '170px',
                height: '80px',
                float: 'right',
                marginRight: '40px',
                marginTop: '-67px',
                background: 'url(../static/images/logo.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
              />
            </div>
            {/* Profile Menu */}
            <div
              style={{
                position: 'fixed',
                // width: '300px',
                left: '15px',
                top: '110px',
                backgroundColor: 'rgba(0,0,0,.9)',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 0px 15px #000',
                zIndex: 1000,
                border: '1px solid #000'
              }}
              hidden={!this.state.profile_menu_visible}
            >
              <Button primary style={{width: '200px', height: '30px'}} onClick={() => this.props.changeTab('trip-bookings')}>Trip&nbsp;Bookings</Button>
              <br />
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('accommodation-bookings')}>Accommodation&nbsp;Bookings</Button>
              <br />
              {/* <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('trip-history')}>Trip&nbsp;History</Button>
              <br />
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('accommodation-history')}>Accommodation&nbsp;History</Button>
              <br /> */}
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.showMessageDialog()}>Send Message</Button>
              <br />
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('settings')}>Settings</Button>
            </div>
          </div>

          {/* Buttons & Form Container */}

          <div
            style={{
              position: 'fixed',
              top: '30%',
              right: '100px',
              borderRadius: '10px',
              zIndex: 100
            }}
          >

            {/* Forms */}
            <TripBookingForm 
              style={{margin: '0px 0px 0px 0px'}}
              setTripBookingFormVisible={this.setTripBookingFormVisible}
              popover_visible={this.state.trip_booking_popover_visible}
              setLoading={this.props.setLoading}
              dispatch={this.props.dispatch}
            />
            
            <AccommodationBookingForm 
              style={{margin: '0px 0px 0px 0px'}}
              // accommodationDestinations={this.state.accommodationDestinations}
              setAccommodationBookingFormVisible={this.setAccommodationBookingFormVisible}
              popover_visible={this.state.accommodation_booking_popover_visible}
              setLoading={this.props.setLoading}
              dispatch={this.props.dispatch}
            />
            
            {/* Buttons */}
            <div style={{
              display: this.state.trip_booking_popover_visible || this.state.accommodation_booking_popover_visible ? 'none' : 'inline-block'
            }}>
              <Button
                primary
                style={{width: '140px', height: '60px'}}
                onClick={() =>
                {
                  this.setTripBookingFormVisible(!this.state.trip_booking_popover_visible);
                }}
              >
                Transport
              </Button>
              <br />
                
              <Button
                primary
                style={{width: '140px', height: '60px', marginTop: '20px'}}
                ref={(btn)=>this.btnAccommodation = btn}
                onClick={(evt)=>
                {
                  this.setAccommodationBookingFormVisible(!this.state.accommodation_booking_popover_visible);
                }}
              >
                Accommodation
              </Button>
              <br />
                
              <Button
                primary
                style={{width: '140px', height: '60px', marginTop: '20px'}}
                onClick={()=>
                {
                }}
              >
                Packages
              </Button>
            </div>
          </div>

          {/* Slider */}
          <div
            style={{
              marginTop: '-50px',
              width: '100%',
              height: '97vh',
            }}
          >

            <Slider
              images={images}
              coolButtons
              showDots
              index={0}
            />
          </div>
          {msg_modal}
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Home.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  accommodationDestinations: PropTypes.array.isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
  accommodationDestinations: getAllAccommodationDestinations(state)
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(Home);