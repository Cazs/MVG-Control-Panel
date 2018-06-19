import React, {Component} from 'react';
import Modal from 'react-modal';
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

export class MessageModal extends Component
{
    constructor(props)
    {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = 
        {
            new_message:
            {
              subject: null,
              message: null,
              receiver: null,
              creator: null,
              date_logged: new Date().getTime()
            }
        }
    }

    openModal()
    {
        this.setState({ is_modal_open: true });
    }
    
    afterOpenModal()
    {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#2FA7FF';
    }
    
    closeModal()
    {
        this.setState({is_modal_open: false});
    }

    render()
    {
      const msg_modal = (
        <Modal
          isOpen={true}// {this.state.is_modal_open}
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
                          style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
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
        return (msg_modal);
    }
}