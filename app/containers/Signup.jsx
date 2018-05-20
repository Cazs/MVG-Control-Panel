// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

// Actions
import * as ACTION_TYPES from '../constants/actions.jsx';
import * as UIActions from '../actions/ui';

// Components
import { Field, Part, Row } from '../components/shared/Part';
import Button from '../components/shared/Button';
import LoginButton from '../components/shared/LoginButton';
import SignupButton from '../components/shared/SignupButton';

// Helpers
import  * as DataManager from '../helpers/DataManager';
import sessionManager from '../helpers/SessionManager';
import Log from '../helpers/Logger';

import
{
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../components/shared/Layout';
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';

// Component
class Signup extends Component
{
  constructor(props)
  {
    super(props);
    this.signup = this.signup.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = 
    {
      new_user: this.newUser()
    };
  }

  newUser()
  {
    return {
      usr: null,
      pwd: null,
      firstname: null,
      lastname: null,
      name: null,
      email: null,
      cell: null,
      access_level: 1 // TODO: start with 0 access level, change it when they've verified their email address.
    }
  }

  showLogin()
  {
    this.props.changeTab('login');
  }

  signup()
  {
    this.props.setLoading(true);
    console.log('creating account: ', this.state.new_user);
    
    if(!this.state.new_user.usr || this.state.new_user.usr.length <= 1)
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid user handle.'));
    }

    if(!this.state.new_user.pwd || this.state.new_user.pwd.length <= 7)
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid password.\nPasswords must be at least 8 characters.'));
    }
      // !this.state.new_user.pwd.includes('@') || !this.state.new_user.pwd.includes('\.')) TODO: check for special chars

    if(!this.state.new_user.firstname || this.state.new_user.firstname.length <= 1)
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid firstname.'));
    }

    if(!this.state.new_user.lastname || this.state.new_user.lastname.length <= 1)
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid lastname.'));
    }

    if(!this.state.new_user.email || this.state.new_user.email.length <= 1 ||
        !this.state.new_user.email.includes('@') || !this.state.new_user.email.includes('\.'))
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid email address.'));
    }

    if(!this.state.new_user.cell || this.state.new_user.cell.length <= 9)
    {
      this.props.setLoading(false);
      return this.props.dispatch(UIActions.newNotification('danger', 'Invalid cellphone number.'));
    }

    this.state.new_user.name = this.state.new_user.firstname + ' ' + this.state.new_user.lastname;
    this.state.new_user.initials = this.state.new_user.firstname.charAt(0) + this.state.new_user.lastname.charAt(0);
    this.state.new_user.active = false;
    // TODO: bcrypt
    // Send signup request
    DataManager.putRemoteResource(this.props.dispatch, DataManager.db_users, this.state.new_user, '/user', 'users')
    .then(res =>
    {
      console.log('response data: ' + res);
      this.props.dispatch(
      {
        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        payload:
        {
          type: 'success',
          message: 'Successfully created your account.'
        }
      });
      this.props.changeTab('login');
      this.props.setLoading(false);
    })
    .catch(err =>
    {
      console.log('error: ', err);
      this.props.dispatch(
      {
        type: ACTION_TYPES.UI_NOTIFICATION_NEW,
        payload:
        {
          type: 'danger',
          message: err.message
        }
      });
      this.props.setLoading(false);
    });
  }

  // Render Main Content

  render()
  {
    const home_button_style = {width: '450px', height: '190px', fontSize: '28pt'}

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Signup</PageHeaderTitle>
          <PageHeaderActions ref={this.header_actions}>
            {/* <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
            </div> */}
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <div style={{background:'rgba(0,0,0,.0)', height: '100%', marginTop: '-20px'}}>
            <div style={{padding: '20px', width: '34%', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto'}}>
              <div style={{
                  width: '100%',
                  height: '120px',
                  float: 'right',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  // marginTop: '-67px',
                  background: 'url(../static/images/logo.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
            <div style={{
                padding: '20px',
                width: '60%',
                marginTop: '150px',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: '10px',
                border: '1px solid #000',
                backgroundColor: '#383833',
                boxShadow: '-5px 5px 30px #343434'
              }}
            >
              <div className='row'>
                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>Username</label>
                  <input
                    ref={(txt_username)=>this.txt_username = txt_username}
                    name="username"
                    type="text"
                    // defaultValue={sessionManager.getSessionUser().usr}
                    value={this.state.new_user.usr}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.usr = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>Password</label>
                  <input
                    ref={(txt_password)=>this.txt_password = txt_password}
                    name="password"
                    type="password"
                    value={this.state.new_user.pwd}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.pwd = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>Firstname</label>
                  <input
                    ref={(txt_firstname)=>this.txt_firstname = txt_firstname}
                    name="firstname"
                    type="text"
                    value={this.state.new_user.firstname}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.firstname = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>Lastname</label>
                  <input
                    ref={(txt_lastname)=>this.txt_lastname = txt_lastname}
                    name="lastname"
                    type="text"
                    value={this.state.new_user.lastname}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.lastname = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>eMail Address</label>
                  <input
                    ref={(txt_email)=>this.txt_email = txt_email}
                    name="email"
                    type="email"
                    value={this.state.new_user.email}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.email = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel" style={{color: '#fff'}}>Cell No.</label>
                  <input
                    ref={(txt_cell)=>this.txt_cell = txt_cell}
                    name="cell"
                    type="text"
                    value={this.state.new_user.cell}
                    onChange={(new_val)=>
                    {
                      const user = this.state.new_user;
                      user.cell = new_val.currentTarget.value;
                      this.setState({new_user: user});
                    }}
                    style={{width: '250px', height: '35px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="pageItem col-md-6">
                  <SignupButton
                    style={{width: '200px', height: '85px'}}
                    onClick={(evt)=>this.signup()}
                  >
                    Signup
                  </SignupButton>
                </div>
                <div className="pageItem col-md-6">
                  <p style={{textAlign: 'right', color: '#fff'}}>Already have an account?</p>
                  <LoginButton
                    style={{float: 'right'}}
                    onClick={(evt)=>this.showLogin()}
                  >
                    Login
                  </LoginButton>
                </div>
              </div>
            </div>
          </div>
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Signup.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(Signup);
