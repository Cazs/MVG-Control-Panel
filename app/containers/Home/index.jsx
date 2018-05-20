// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';


// Components
import { Field, Part, Row } from '../../components/shared/Part';
import Button from '../../components/shared/Button';
import { Tab, Tabs, TabContent } from '../../components/shared/Tabs';
import Slider from '../../components/slideshow/Slider';
import ComboBox from '../../components/shared/ComboBox';

import "./home-style.css";

// Actions
import * as ACTION_TYPES from '../../constants/actions.jsx';
import * as UIActions from '../../actions/ui';

import
{
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

const images = [
    '../static/images/slider/1.jpg',
    '../static/images/slider/2.jpg',
    '../static/images/slider/3.jpg',
  ];

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

// Component
class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.btnAccommodation = React.createRef();

    this.state =
    {
      popover_right: '240px',
      popover_top: '0px',
      popover_visible: false,
      popover_context: null,
      profile_menu_visible: false,
      // slider_height: window.innerHeight,

      new_enquiry:
      {
        client_id: null,
        pickup_location: null,
        destination: null,
        date_scheduled: 0,
        trip_type: null,
        notes: null
      }
    };
  }

  // Render Main Content

  render()
  {
    const trip_types = [{type_name: 'One-Way'}, {type_name: 'Return'}];

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>MVG | Home</PageHeaderTitle>
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
              <Button primary style={{width: '130px', height: '30px'}} onClick={()=>this.props.changeTab('enquiries')}>Enquiries</Button>
              <br />
              <Button primary style={{width: '130px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('quotes')}>Quotes</Button>
              <br />
              <Button primary style={{width: '130px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('trips')}>Trips</Button>
              <br />
              <Button primary style={{width: '130px', height: '30px', marginTop: '15px'}} onClick={()=>this.props.changeTab('invoices')}>Invoices</Button>
            </div>
          </div>

          {/* Buttons Container */}

          <div
            style={{
              position: 'fixed',
              top: '30%',
              right: '100px',
              // width: '800px',
              // height: '250px',
              // backgroundColor: 'rgba(0,0,0,.8)',
              borderRadius: '10px',
              display: 'inline-block',
              zIndex: 100
            }}
          >
            {/* Enquiry Form Container */}
            <div
              style={{
                // position: 'fixed',
                // top: this.state.popover_top,
                // right: this.state.popover_right,
                marginTop: this.state.popover_top,
                marginRight: '20px',
                float: 'left',
                width: '600px',
                backgroundColor: 'rgba(0,0,0,.9)',
                boxShadow: '0px 0px 35px #000',
                borderRadius: '10px',
                zIndex: 100,
                padding: '15px'
              }}
              hidden={!this.state.popover_visible}
            >
              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Pickup Address</label>
                  <input
                    id="pickup_location"
                    ref={(pickup_location)=>this.pickup_location=pickup_location}
                    name="pickup_location"
                    type="text"
                    value={this.state.new_enquiry.pickup_location}
                    onChange={(new_val)=> {
                        const enquiry = this.state.new_enquiry;
                        
                        enquiry.pickup_location = new_val.currentTarget.value;
                        this.setState({new_enquiry: enquiry});
                      }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Destination Address</label>
                  <input
                    id="destination"
                    ref={(destination)=>this.destination=destination}
                    name="destination"
                    type="text"
                    value={this.state.new_enquiry.destination}
                    onChange={(new_val)=> {
                        const enquiry = this.state.new_enquiry;
                        
                        enquiry.destination = new_val.currentTarget.value;
                        this.setState({new_enquiry: enquiry});
                      }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Trip-Type</label>
                  <div>
                    <ComboBox
                      items={trip_types}
                      label='type_name'
                        // defaultValue={this.props.materials[0]}
                      onUpdate={(newValue) =>
                        {
                          // get selected value
                          const selected_type = JSON.parse(newValue);
                          const enquiry = this.state.new_enquiry;
                          enquiry.trip_type = selected_type.type_name;
                          // update state
                          this.setState({new_enquiry: enquiry});
                        }}
                    />
                  </div>
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Date Scheduled</label>
                  <input
                    name="date_scheduled"
                    type="date"
                    ref={(date_scheduled)=>this.date_started=date_scheduled}
                    // value={this.state.new_enquiry.scheduled_date.getFullYear() + '-' 
                    //   + ((this.state.new_enquiry.scheduled_date.getMonth()+1) >= 10 ? this.state.new_enquiry.scheduled_date.getMonth() + 1 : '0' + (this.state.new_enquiry.scheduled_date.getMonth() + 1)) + '-'
                    //   + (this.state.new_enquiry.scheduled_date.getDate() >= 10 ? this.state.new_enquiry.scheduled_date.getDate() : '0' + this.state.new_enquiry.scheduled_date.getDate())}
                    onChange={(new_val)=>
                      {
                        console.log(new_val.currentTarget.value);
                        const enquiry = this.state.new_enquiry;
                        
                        enquiry.scheduled_date = new Date(new_val.currentTarget.value);
                        enquiry.date_scheduled = enquiry.scheduled_date.getTime();
                        this.setState({new_enquiry: enquiry});
                      }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Number of Adults</label>
                  <input
                    id="adult_count"
                    ref={(adult_count)=>this.adult_count=adult_count}
                    name="adult_count"
                    type="number"
                    value={this.state.new_enquiry.adult_count}
                    onChange={(new_val)=> {
                          const enquiry = this.state.new_enquiry;
                          
                          enquiry.adult_count = new_val.currentTarget.value;
                          this.setState({new_enquiry: enquiry});
                        }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Number of Children</label>
                  <input
                    id="child_count"
                    ref={(child_count)=>this.child_count=child_count}
                    name="child_count"
                    type="number"
                    value={this.state.new_enquiry.child_count}
                    onChange={(new_val)=> {
                          const enquiry = this.state.new_enquiry;
                          
                          enquiry.child_count = new_val.currentTarget.value;
                          this.setState({new_enquiry: enquiry});
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
                      this.props.dispatch({
                          type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                          payload: {
                            type: 'warning',
                            message: 'Info: Feature not implemented yet',
                          },
                        });
                    }}
                >
                  Create
                </Button>
              </div>
            </div>
            
            <Button
              primary
              style={{width: '140px', height: '60px'}}
              onClick={()=>
                {
                  if(this.state.popover_context === 'transport' && this.state.popover_visible)
                    this.setState({popover_visible: false, popover_context: null}); // hide popover if click button and already showing transport
                  else
                    this.setState({popover_visible: true, popover_context: 'transport', popover_top: '0px'});
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
                if(this.state.popover_context === 'accommodation' && this.state.popover_visible)
                  this.setState({popover_visible: false, popover_context: null}); // hide popover if click button and already showing accommodation
                else
                {
                  // console.log(evt.currentTarget.style);
                  this.setState(
                    {
                      popover_visible: true,
                      popover_context: 'accommodation',
                      popover_top: '80px' // evt.currentTarget.style.top
                    });
                }
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
                if(this.state.popover_context === 'experiences' && this.state.popover_visible)
                  this.setState({popover_visible: false, popover_context: null}); // hide popover if click button and already showing experiences
                else
                  this.setState(
                    {
                      popover_visible: true,
                      popover_context: 'experiences',
                      popover_top: '160px' // evt.currentTarget.style.top
                    });
              }}
            >
              Experiences
            </Button>
          </div>

          <div
            style={{
              marginTop: '0px',
              width: '100%',
              height: '97vh',
              backgroundColor: 'lime'
            }}
          >

            <Slider
              images={images}
              coolButtons
              showDots
              index={0}
            />
          </div>

          {/* <button
            style={{marginTop: '300px'}}
            onClick={() => this.props.changeTab('enquiries')}
          >Show&nbsp;Dashboard
          </button> */}
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
