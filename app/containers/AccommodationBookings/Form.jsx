import React from 'react';
import ComboBox from '../../components/shared/ComboBox';
import Button from '../../components/shared/Button';

export class AccommodationBookingForm extends React.Component
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
                  <label className="itemLabel">From</label>
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

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Till</label>
                  <input
                    name="return_date"
                    type="date"
                    onChange={(new_val)=>
                      {
                        const booking = this.state.new_booking;
                        
                        booking.return_date = new Date(new_val.currentTarget.value);
                        booking.date_returned = booking.scheduled_date.getTime();
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
            accommodation_id: null,
            client_id: null,
            date_scheduled: 0,
            return_date: 0,
            adult_count: 0,
            children_count: 0,
            creator: null,
            authoriser: null,
            date_logged: null,
            status: 0,
            notes: null
        }
}