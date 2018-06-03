import React from 'react';
import ComboBox from '../../components/shared/ComboBox';
import Button from '../../components/shared/Button';

export class TripBookingForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            new_booking: newBooking()
        }
    }

    render()
    {
        const trip_types = [{type_name: 'One-Way'}, {type_name: 'Return'}];

        return (
            <div
              style={{
                float: 'left',
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
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Pickup&nbsp;Address</label>
                  <input
                    id="pickup_location"
                    name="pickup_location"
                    type="text"
                    value={this.state.new_booking.pickup_location}
                    onChange={(new_val)=> {
                        const booking = this.state.new_booking;
                        
                        booking.pickup_location = new_val.currentTarget.value;
                        this.setState({new_booking: booking});
                      }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Destination&nbsp;Address</label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    value={this.state.new_booking.destination}
                    onChange={(new_val)=> {
                        const booking = this.state.new_booking;
                        
                        booking.destination = new_val.currentTarget.value;
                        this.setState({new_booking: booking});
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
                            const booking = this.state.new_booking;
                            booking.trip_type = selected_type.type_name;
                            // update state
                            this.setState({new_booking: booking});
                        }}
                    />
                  </div>
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Date&nbsp;Scheduled</label>
                  <input
                    name="date_scheduled"
                    type="date"
                    // value={this.state.new_booking.scheduled_date.getFullYear() + '-' 
                    //   + ((this.state.new_booking.scheduled_date.getMonth()+1) >= 10 ? this.state.new_booking.scheduled_date.getMonth() + 1 : '0' + (this.state.new_booking.scheduled_date.getMonth() + 1)) + '-'
                    //   + (this.state.new_booking.scheduled_date.getDate() >= 10 ? this.state.new_booking.scheduled_date.getDate() : '0' + this.state.new_booking.scheduled_date.getDate())}
                    onChange={(new_val)=>
                      {
                        console.log(new_val.currentTarget.value);
                        const booking = this.state.new_booking;
                        
                        booking.scheduled_date = new Date(new_val.currentTarget.value);
                        booking.date_scheduled = booking.scheduled_date.getTime();
                        this.setState({new_booking: booking});
                      }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Number&nbsp;of&nbsp;Adults</label>
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
                  <label className="itemLabel">Number&nbsp;of&nbsp;Children</label>
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
        );
    }
}

export const newBooking = () =>
{
  return {
            client_id: null,
            pickup_location: null,
            destination: null,
            date_scheduled: 0,
            return_date: 0,
            trip_type: null, // one-way or return
            date_driver_assigned: 0,
            adult_count: 0,
            children_count: 0,
            creator: null,
            authoriser: null,
            status: 0,
            date_logged: null,
            notes: null
        }
}