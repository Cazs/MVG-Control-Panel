// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

// Components
import Button from '../../components/shared/Button';
import Slider from '../../components/slideshow/Slider';

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import { TripBookingForm } from '../TripBookings/Form';
import { AccommodationBookingForm } from '../AccommodationBookings/Form';

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

// Component
class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.setTripBookingFormVisible = this.setTripBookingFormVisible.bind(this);
    this.setAccommodationBookingFormVisible = this.setAccommodationBookingFormVisible.bind(this);

    this.state =
    {
      trip_booking_popover_visible: false,
      accommodation_booking_popover_visible: false,

      profile_menu_visible: false
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

  // Render Main Content

  render()
  {
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
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('trip-history')}>Trip&nbsp;History</Button>
              <br />
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('accommodation-history')}>Accommodation&nbsp;History</Button>
              <br />
              <Button primary style={{width: '200px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('invoices')}>Settings</Button>
            </div>
          </div>

          {/* Buttons Container */}

          <div
            style={{
              position: 'fixed',
              top: '30%',
              right: '100px',
              borderRadius: '10px',
              display: 'inline-block',
              zIndex: 100
            }}
          >

            <TripBookingForm 
              style={{margin: '0px 0px 0px 0px'}}
              setTripBookingFormVisible={this.setTripBookingFormVisible}
              popover_visible={this.state.trip_booking_popover_visible}
              setLoading={this.props.setLoading}
              dispatch={this.props.dispatch}
            />

            <AccommodationBookingForm 
              style={{margin: '0px 0px 0px 0px'}}
              setAccommodationBookingFormVisible={this.setAccommodationBookingFormVisible}
              popover_visible={this.state.accommodation_booking_popover_visible}
              setLoading={this.props.setLoading}
              dispatch={this.props.dispatch}
            />
            
            <Button
              primary
              style={{width: '140px', height: '60px'}}
              onClick={()=>
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
              Experiences
            </Button>
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
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Home.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(Home);