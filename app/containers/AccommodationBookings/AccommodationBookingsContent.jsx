// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

const openDialog = require('../../renderers/dialog.js');
const ipc = require('electron').ipcRenderer;

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

export class Enquiries extends React.Component
{
  constructor(props)
  {
    super(props);
    
    this.editEnquiry = this.editEnquiry.bind(this);
    this.deleteEnquiry = this.deleteEnquiry.bind(this);
    this.duplicateEnquiry = this.duplicateEnquiry.bind(this);
    this.setEnquiryStatus = this.setEnquiryStatus.bind(this);
    this.expandComponent = this.expandComponent.bind(this);
    
    // this.creator_ref = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.col_toggles_container = null;
    this.col_width = 235;
    this.state = {  filter: null,
                    is_new_enquiry_modal_open: false,
                    is_enquiry_items_modal_open: false,
                    selected_enquiry: null,
                    active_row: null,
                    column_toggles_top: -200,
                    // Table Column Toggles
                    col_id_visible: false,
                    col_object_number_visible: true,
                    col_client_id_visible: true,
                    col_contact_person_id_visible: false,
                    col_sitename_visible: false,
                    col_request_visible: true,
                    col_vat_visible: false,
                    col_revision_visible: false,
                    col_status_visible: true,
                    col_creator_visible: false,
                    col_date_logged_visible: false,
                    // Enquiry to be created
                    new_enquiry:
                    {
                      client_id: null,
                      client: null,
                      contact_id: null,
                      contact: null,
                      request: null,
                      sitename: null,
                      notes: null,
                      vat: GlobalConstants.VAT,
                      status: 0,
                      resources: []
                    },
                    // Enquiry Item to be added
                    new_enquiry_item:
                    {
                      resource_id: null,
                      unit_cost: 0,
                      quantity: 1,
                      markup: 0,
                      additional_costs: ''
                    }
    };
  }

  // Load Enquiries & add event listeners
  componentDidMount()
  {
    // Add Event Listener
    ipc.on('confirmed-delete-enquiry', (event, index, enquiryId) =>
    {
      if (index === 0)
      {
        this.confirmedDeleteEnquiry(enquiryId);
      }
    });
  }

  // Remove all IPC listeners when unmounted
  componentWillUnmount()
  {
    ipc.removeAllListeners('confirmed-delete-enquiry');
  }

  // Open Confirm Dialog
  deleteEnquiry(enquiryId)
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
      'confirmed-delete-enquiry',
      enquiryId
    );
  }

  showEnquiryPreview(enquiry)
  {
    // Preview Window
    ipc.send('preview-enquiry', enquiry);
  }

  // Confirm Delete an enquiry
  confirmedDeleteEnquiry(enquiryId)
  {
    const { dispatch } = this.props;
    // dispatch(Actions.deleteEnquiry(enquiryId));
  }

  // set the enquiry status
  setEnquiryStatus(enquiryId, status)
  {
    alert('set status to: ' + status);
    const { dispatch } = this.props;
    // dispatch(Actions.setEnquiryStatus(enquiryId, status));
  }

  editEnquiry(enquiry)
  {
    const { dispatch } = this.props;
    // dispatch(Actions.editEnquiry(enquiry));
  }

  duplicateEnquiry(enquiry)
  {
    const { dispatch } = this.props;
    // dispatch(Actions.duplicateEnquiry(enquiry));
  }

  setFilter(event)
  {
    const currentFilter = this.state.filter;
    const newFilter = event.target.dataset.filter;
    this.setState({ filter: currentFilter === newFilter ? null : newFilter });
  }

  getCaret(direction)
  {
    if (direction === 'asc')
    {
      return (
        <img src="../static/open-iconic-master/svg/caret-top.svg" alt='up' />
      );
    }
    if (direction === 'desc') {
      return (
        <img src="../static/open-iconic-master/svg/caret-bottom.svg" alt='down' />
      );
    }
    return (
      <span>
        <img src="../static/open-iconic-master/svg/info.svg" alt='info' style={{width: '13px', height: '13px', marginLeft: '10px'}} />
        (click&nbsp;to&nbsp;sort)
      </span>
    );
  }

  onAfterSaveCell(row, cellName, cellValue)
  {
    // alert(`After cell save ${cellName} with value ${cellValue}`);
  
    // let rowStr = '';
    /* for (const prop in row) {
      rowStr += prop + ': ' + row[prop] + '\n';
    } */
  
    // alert('Thw whole row :\n' + rowStr);
  }
  
  onBeforeSaveCell(row, cellName, cellValue)
  {
    // alert(`Before cell save ${cellName} with value ${cellValue}`);
    // You can do any validation on here for editing value,
    // return false for reject the editing
    return true;
  }

  isExpandableRow(row)
  {
    // (row.object_number < 50) ? return true : return false;
    return true;
  }

  expandComponent(row)
  {
    const cellEditProp =
    {
      mode: 'click',
        // if product id less than 3, will cause the whole row noneditable
        // this function should return an array of row keys
        // enquiries.filter(q => q.id < 3).map(p => p.id)
      nonEditableRows: () => ['_id', 'object_number'],
      blurToSave: true
      // beforeSaveCell: {},// this.onBeforeSaveCell, // a hook for before saving cell
      // afterSaveCell: {}// this.onAfterSaveCell  // a hook for after saving cell
    };

    const options =
    {
      defaultSortName: 'item_number',  // default sort column name
      defaultSortOrder: 'asc'
    };

    const enquiry_options = (
      <div>
        <CustomButton primary onClick={() => this.showEnquiryPreview(row)}>PDF Preview</CustomButton>
        <CustomButton
          primary
          style={{marginLeft: '15px'}}
          onClick={(evt) =>
          {
            // if(!row.status == 0)
            // {
            //   return this.props.dispatch({
            //     type: ACTION_TYPES.UI_NOTIFICATION_NEW,
            //     payload: {
            //       type: 'danger',
            //       message: 'Error: Enquiry has not yet been approved',
            //     },
            //   });
            // }

            // Prepare Trip
            const new_trip =
            {
              // object_number = this.props.enquiries.length,
              enquiry_id: row._id,
              enquiry: row,
              client_name: row.client_name,
              client: row.client,
              contact_person: row.contact_person,
              contact: row.contact,
              request: row.request,
              sitename: row.sitename,
              vat: row.vat,
              creator_name: SessionManager.getSessionUser().name,
              status: 0,
              enquiry_revisions: row.revision,
              tasks: [],
              creator: SessionManager.getSessionUser().usr,
              creator_user: SessionManager.getSessionUser(),
              date_logged: new Date().getTime()/1000 // current date in epoch SECONDS
            }

            // this.props.trips.push(new_trip);

            // ipc.send(evt, 'change-operations-tab', 2);

            // dispatch action to create trip on local & remote stores
            this.props.dispatch({
              type: ACTION_TYPES.TRIP_NEW,
              payload: new_trip
            });

            // this.props.changeTab(2);
          }}
        >Create&nbsp;New&nbsp;Trip
        </CustomButton>
      </div>
    );

    const new_enquiry_item_form = (
      <div>
        {/* form for adding a new EnquiryItem */}
        <div style={{backgroundColor: 'rgba(255,255,255,.6)', borderRadius: '4px', marginTop: '20px'}}>
          <h3 style={{textAlign: 'center', 'fontWeight': 'lighter'}}>Add materials to enquiry #{row.object_number}</h3>
          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Material</label>
              <div>
                <ComboBox
                  items={this.props.materials}
                  label='resource_description'
                    // defaultValue={this.props.materials[0]}
                  onUpdate={(newValue) =>
                    {
                      // get selected value
                      const selected_mat = JSON.parse(newValue);

                      this.unit_cost.value = selected_mat.resource_value;

                      // create enquiry_item obj
                      const enquiry_item =
                      {
                        item_number: row.resources.length,
                        enquiry_id: row._id,
                        resource_id: selected_mat._id,
                        unit_cost: selected_mat.resource_value,
                        quantity: 1,
                        unit: selected_mat.unit,
                        item_description: selected_mat.resource_description
                      };

                      // update state
                      this.setState({new_enquiry_item: enquiry_item});
                    }}
                />
              </div>
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">Unit Cost</label>
              <input
                id="unit_cost"
                ref={(unit_cost)=>this.unit_cost=unit_cost}
                name="unit_cost"
                type="text"
                value={this.state.new_enquiry_item.unit_cost}
                onChange={(new_val)=> {
                    const enquiry_item = this.state.new_enquiry_item;
                    
                    enquiry_item.unit_cost = new_val.currentTarget.value;
                    this.setState({new_enquiry_item: enquiry_item});
                  }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
          </div>

          <div className="row">
            <div className="pageItem col-md-6">
              <label className="itemLabel">Quantity</label>
              <input
                name="quantity"
                type="number"
                value={this.state.new_enquiry_item.quantity}
                onChange={(new_val)=> {
                    const enquiry_item = this.state.new_enquiry_item;
                    
                    enquiry_item.quantity = new_val.currentTarget.value;
                    this.setState({new_enquiry_item: enquiry_item});
                  }}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>

            <div className="pageItem col-md-6">
              <label className="itemLabel">Unit</label>
              <input
                name="unit"
                type="text"
                disabled
                value={this.state.new_enquiry_item.unit}
                style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
              />
            </div>
          </div>
          <div style={{width: '300px', marginLeft: 'auto', marginRight: 'auto', marginTop: '15px'}}>
            <CustomButton
              success
              style={{width: '120px', height: '50px', float: 'left'}}
              onClick={() =>
              {
                if(this.state.new_enquiry_item.resource_id && this.state.new_enquiry_item.enquiry_id)
                {
                  const enquiry_item = this.state.new_enquiry_item;
                  enquiry_item.date_logged = new Date().getTime()/1000; // epoch sec
                  enquiry_item.creator = SessionManager.getSessionUser().usr;
                  console.log('creating new enquiry item: ', enquiry_item);

                  row.resources.push(enquiry_item);
                  // update state
                  this.setState({new_enquiry_item: enquiry_item});
                  // signal add enquiry item
                  this.props.dispatch({
                    type: ACTION_TYPES.QUOTE_ITEM_ADD,
                    payload: enquiry_item
                  });

                  // TODO: fix this hack
                  // signal update enquiry - so it saves to local storage
                  this.props.dispatch({
                    type: ACTION_TYPES.QUOTE_UPDATE,
                    payload: row
                  });
                  // this.setState(this.state.new_enquiry_item);
                } else
                  openDialog(
                  {
                    type: 'warning',
                    title: 'Could not add material to enquiry',
                    message: 'Please select a valid material from the drop down list',
                    buttons: [
                      'Yes',
                      'No'
                    ]
                  })
              }}
            >Add
            </CustomButton>
            <CustomButton style={{width: '120px', height: '50px', float: 'left', marginLeft: '15px'}} danger>Reset Fields</CustomButton>
          </div>
        </div> 
      </div>
    );
    // console.log('-<><><><><>:-< ', row.resources)
    return  (
      row.resources.length === 0 ? (
        <div>
          { enquiry_options }
          <Message danger text='Enquiry has no resources.' />
          {/* form for adding a new EnquiryItem */}
          {new_enquiry_item_form}
        </div>
      ) :
        <div style={{maxHeight: 'auto'}}>
          { enquiry_options }
          <h3 style={{textAlign: 'center', 'fontWeight': 'lighter'}}>List of materials for enquiry #{row.object_number}</h3>
          <BootstrapTable
            id='tblEnquiryResources'
            key='tblEnquiryResources'
            data={row.resources}
            striped
            hover
            insertRow={false}
            cellEdit={cellEditProp}
            options={options}
            // onScroll={}
            version='4' // bootstrap version
          >
            <TableHeaderColumn
              dataField='item_number'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_object_number_visible}
            > Item Number
            </TableHeaderColumn>

            <TableHeaderColumn
              isKey
              dataField='item_description'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_object_number_visible}
            > Item Description
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField='unit_cost'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_client_id_visible}
            > Unit Cost
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField='quantity'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_contact_person_id_visible}
            > Quantity
            </TableHeaderColumn>
            
            <TableHeaderColumn
              dataField='unit'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_sitename_visible}
            >  Measurement/Unit
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField='additional_costs'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              // hidden={!this.state.col_request_visible}
            > Extra Costs
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField='other'
              dataSort
              caretRender={this.getCaret}
              tdStyle={{'fontWeight': 'lighter', whiteSpace: 'normal'}}
              thStyle={{ whiteSpace: 'normal' }}
              hidden
            > Notes
            </TableHeaderColumn>
          </BootstrapTable>

          {/* form for adding a new EnquiryItem */}
          {new_enquiry_item_form}
        </div>
    );
  }

  expandColumnComponent({ isExpandableRow, isExpanded })
  {
    if (isExpandableRow)
    {
      if(isExpanded)
        return (<span className="ion-arrow-down-b" />);
      return (<span className="ion-arrow-right-b" />);
    } 
    return(<span />);
  }

  toggleColumnVisibility()
  {
    // alert(this.getState().col_id_visible);
    // let cur = 0;
    let id_end = 190;
    if(this.state.col_id_visible)
    {
      id_end += this.col_width;
    }
    // alert('id col ends at ' + id_end)
    // cur += this.state.col_id_end;

    this.setState(
    {
      col_id_end: id_end,// this.state.col_id_visible ? 190 + this.col_width : 190,
      col_object_number_end: this.state.col_object_number_visible ? this.state.col_id_end + this.col_width : this.state.col_id_end
    });
  }

  openModal()
  {
    this.setState({ is_new_enquiry_modal_open: true });
  }
 
  afterOpenModal()
  {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#2FA7FF';
  }
 
  closeModal()
  {
    this.setState({is_new_enquiry_modal_open: false});
  }

  handleEnquiryUpdate(evt, enquiry)
  {
    if(evt.key === 'Enter')
    {
      Log('verbose_info', 'updating enquiry: ' +  enquiry);
      this.props.dispatch({
        type: ACTION_TYPES.QUOTE_UPDATE,
        payload: Object.assign(enquiry, { creator: SessionManager.getSessionUser().usr })
      });
    }
  }

  // Render
  render()
  {
    const { enquiries, t } = this.props;
    
    const cellEditProp =
    {
      mode: 'click',
        // if product id less than 3, will cause the whole row noneditable
        // this function should return an array of row keys
        // enquiries.filter(q => q.id < 3).map(p => p.id)
      nonEditableRows: () => ['_id', 'object_number', 'date_logged', 'creator', 'creator_name'],
      blurToSave: true,
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    };

    const options =
    {
      defaultSortName: 'object_number',  // default sort column name
      defaultSortOrder: 'desc',
      expandRowBgColor: 'rgba(0, 0, 0, .4)',
    };

    // const clientFormatter = (cell, row) => (<div>test</div>);
    const clientFormatter = (cell, row) => `<i class='glyphicon glyphicon-${cell.client_name}'></i> ${cell.client_name}`;

    return (
      <PageContent bare>
        <div style={{maxHeight: 'auto'}}>
          {/* Enquiry Creation Modal */}
          <Modal
            isOpen={this.state.is_new_enquiry_modal_open}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={modalStyle}
            contentLabel="New Enquiry Modal"
          >
            <h2 ref={subtitle => this.subtitle = subtitle} style={{color: 'black'}}>Create New Enquiry</h2>
            <div>
              <div className="pageItem">
                {/* <label className="itemLabel">{t('settings:fields:logo:name')}</label>
                  <Logo
                    logo={this.state.logo}
                    handleLogoChange={this.handleLogoChange}
                  /> */}
              </div>
              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Company</label>
                  <div>
                    <ComboBox
                      ref={(cbx_clients)=>this.cbx_clients = cbx_clients}
                      items={this.props.clients}
                        // selected_item={this.state.new_enquiry.client}
                      label='client_name'
                      onUpdate={(new_val)=>{
                          const selected_client = JSON.parse(new_val);
                          
                          const enquiry = this.state.new_enquiry;
                          enquiry.client_id = selected_client._id;
                          enquiry.client = selected_client;

                          this.setState({new_enquiry: enquiry});
                          this.sitename = selected_client.physical_address;
                        }}
                    />
                  </div>
                </div>
                <div className="pageItem col-md-6">
                  <label className="itemLabel"> Contact </label>
                  {/* TODO: common:fields:email? */}
                  <div>
                    <ComboBox 
                      ref={(cbx_contacts)=>this.cbx_contacts = cbx_contacts}
                      items={this.props.users}
                        // selected_item={this.state.new_enquiry.contact}
                      label='name'
                      onUpdate={(new_val)=>{
                          const selected_contact = JSON.parse(new_val);
                          const enquiry = this.state.new_enquiry;
                          enquiry.contact_id = selected_contact.usr;
                          enquiry.contact = selected_contact;

                          this.setState({new_enquiry: enquiry});
                        }}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">Sitename</label>
                  <input
                    ref={(txt_sitename)=>this.txt_sitename = txt_sitename}
                    name="sitename"
                    type="text"
                    // value={this.state.new_enquiry.sitename}
                    onChange={(new_val)=>{
                      const enquiry = this.state.new_enquiry;
                      enquiry.sitename = new_val.currentTarget.value;
                      this.setState({new_enquiry: enquiry});
                    }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Request</label>
                  <input
                    name="request"
                    type="text"
                    ref={(txt_request)=>this.txt_request = txt_request}
                    onChange={(new_val)=>{
                      const enquiry = this.state.new_enquiry;
                      enquiry.request = new_val.currentTarget.value;
                      this.setState({new_enquiry: enquiry});
                    }}
                    style={{border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <div className="row">
                <div className="pageItem col-md-6">
                  <label className="itemLabel">VAT [{this.state.new_enquiry.vat} %]</label>
                  <label className="switch">
                    <input
                      name="vat"
                      type="checkbox"
                      checked={this.state.new_enquiry.vat>0}
                      onChange={() =>
                        {
                          const enquiry = this.state.new_enquiry;
                          enquiry.vat = enquiry.vat > 0 ? 0 : GlobalConstants.VAT;
                          this.setState(
                          {
                            new_enquiry: enquiry
                          });
                        }}
                    />
                    <span className="slider round" />
                  </label>
                </div>

                <div className="pageItem col-md-6">
                  <label className="itemLabel">Notes</label>
                  <textarea
                    name="notes"
                    value={this.state.new_enquiry.other}
                    onChange={this.handleInputChange}
                    style={{width: '580px', border: '1px solid #2FA7FF', borderRadius: '3px'}}
                  />
                </div>
              </div>

              <CustomButton
                onClick={this.closeModal}
                style={{width: '120px', height: '50px', float: 'right'}}
                danger
              >Dismiss
              </CustomButton>

              <CustomButton
                onClick={()=>{
                  const enquiry = this.state.new_enquiry;

                  if(!enquiry.client)
                  {
                    return this.props.dispatch({
                      type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                      payload: {
                        type: 'danger',
                        message: 'Invalid client selected',
                      },
                    });
                  }

                  if(!enquiry.contact)
                  {
                    return this.props.dispatch({
                      type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                      payload: {
                        type: 'danger',
                        message: 'Invalid contact person selected',
                      },
                    });
                  }

                  if(!enquiry.sitename)
                  {
                    return this.props.dispatch({
                            type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                            payload: {
                              type: 'danger',
                              message: 'Invalid sitename',
                            },
                          });
                  }
                  
                  if(!enquiry.request)
                  {
                    return this.props.dispatch({
                      type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                      payload: {
                        type: 'danger',
                        message: 'Error: Invalid request',
                      },
                    });
                  }

                  // Prepare Enquiry
                  const client_name = enquiry.client.client_name.toString();

                  enquiry.object_number = this.props.enquiries.length;
                  enquiry.client_name = client_name;
                  enquiry.client_id = enquiry.client._id;
                  enquiry.contact_person = enquiry.contact.name;
                  enquiry.contact_person_id = enquiry.contact.usr;
                  enquiry.account_name = client_name.toLowerCase().replace(' ', '-');
                  enquiry.creator_name = SessionManager.getSessionUser().name;
                  enquiry.creator = SessionManager.getSessionUser().usr;
                  enquiry.creator_user = SessionManager.getSessionUser();
                  enquiry.date_logged = new Date().getTime()/1000;// current date in epoch SECONDS

                  this.setState({new_enquiry: enquiry, is_new_enquiry_modal_open: false});

                  this.props.enquiries.push(this.state.new_enquiry);
                  mapStateToProps(this.state);

                  // this.props.dispatch({
                  //   type: ACTION_TYPES.UI_NOTIFICATION_NEW,
                  //   payload: {
                  //     type: 'success',
                  //     message: 'Successfully created new enquiry',
                  //   },
                  // });

                  // dispatch action to create enquiry on local & remote stores
                  this.props.dispatch({
                    type: ACTION_TYPES.QUOTE_NEW,
                    payload: this.state.new_enquiry
                  });
                  
                }}
                style={{width: '120px', height: '50px', float: 'left'}}
                success
              >Create
              </CustomButton>
            </div>
          </Modal>

          {/* Enquiries table & Column toggles */}
          <div style={{paddingTop: '0px'}}>
            
            {/* Enquiries Table column toggles */}
            <Transition
              component={false}
              enter={{
                // top: 80,
                translateY: this.state.column_toggles_top
              }}
              leave={{
                // top: -70,
                translateY: this.state.column_toggles_top
              }}
              ref={(el)=> this.col_toggles_container = el}
              style={{
                zIndex: '10',
                background: 'rgb(180, 180, 180)',
                left: window.innerWidth * 0.010 + '%',
              }}
            >  
              <div key='col_toggle' style={{boxShadow: '0px 10px 35px #343434', position: 'fixed', top:  '130px', width: '1175px'}}>
                <h2 style={{textAlign: 'center', fontWeight: 'lighter'}}>Show/Hide Table Columns</h2>
                <Part>
                  <Row>
                    {/* ID column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Enquiry&nbsp;ID</label>
                      <label className="switch">
                        <input
                          name="enquiryID"
                          type="checkbox"
                          checked={this.state.col_id_visible}
                          onChange={() =>
                          {
                            const is_id_visible = !this.state.col_id_visible;
                            this.setState(
                            {
                              col_id_visible: is_id_visible,
                              col_id_end: is_id_visible ? 190 + this.col_width : 190
                              // col_id_end: this.state.col_id_visible ? 190: 380
                            });
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Object # column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Enquiry&nbsp;No.</label>
                      <label className="switch">
                        <input
                          name="enquiryNumber"
                          type="checkbox"
                          checked={this.state.col_object_number_visible}
                          onChange={() =>
                          {
                            const is_num_visible = !this.state.col_object_number_visible;

                            this.setState(
                            {
                              col_object_number_visible: is_num_visible,
                              col_object_number_end: is_num_visible ? this.col_id_end + this.col_width : this.col_id_end
                              // col_object_number_end: this.state.col_object_number_visible ? this.state.col_id_end : this.state.col_id_end + 190
                            });
                            this.toggleColumnVisibility()
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Client column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Client</label>
                      <label className="switch">
                        <input
                          name="clientID"
                          type="checkbox"
                          checked={this.state.col_client_id_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_client_id_visible: !this.state.col_client_id_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Contact column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Contact</label>
                      <label className="switch">
                        <input
                          name="contactID"
                          type="checkbox"
                          checked={this.state.col_contact_person_id_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_contact_person_id_visible: !this.state.col_contact_person_id_visible
                            });
                            this.toggleColumnVisibility()
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Sitename column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Sitename</label>
                      <label className="switch">
                        <input
                          name="sitename"
                          type="checkbox"
                          checked={this.state.col_sitename_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_sitename_visible: !this.state.col_sitename_visible
                            });
                            this.toggleColumnVisibility()
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Request column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Request</label>
                      <label className="switch">
                        <input
                          name="request"
                          type="checkbox"
                          checked={this.state.col_request_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_request_visible: !this.state.col_request_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* VAT column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">VAT</label>
                      <label className="switch">
                        <input
                          name="vat"
                          type="checkbox"
                          checked={this.state.col_vat_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_vat_visible: !this.state.col_vat_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Revision column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Revision</label>
                      <label className="switch">
                        <input
                          name="revision"
                          type="checkbox"
                          checked={this.state.col_revision_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_revision_visible: !this.state.col_revision_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Status column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Status</label>
                      <label className="switch">
                        <input
                          name="status"
                          type="checkbox"
                          checked={this.state.col_status_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_status_visible: !this.state.col_status_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Creator column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Creator</label>
                      <label className="switch">
                        <input
                          name="creator"
                          type="checkbox"
                          checked={this.state.col_creator_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_creator_visible: !this.state.col_creator_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>

                    {/* Date Logged column toggle */}
                    <Field className="col-lg-1 col-md-2 col-sm-3 col-xs-4">
                      <label className="itemLabel">Date&nbsp;Logged</label>
                      <label className="switch">
                        <input
                          name="date_logged"
                          type="checkbox"
                          checked={this.state.col_date_logged_visible}
                          onChange={() =>
                          {
                            this.setState(
                            {
                              col_date_logged_visible: !this.state.col_date_logged_visible
                            });
                            this.toggleColumnVisibility();
                          }}
                        />
                        <span className="slider round" />
                      </label>
                    </Field>
                  </Row>
                  <Row>
                    <CustomButton onClick={this.openModal} success>Create New Enquiry</CustomButton>
                    <CustomButton
                      success
                      style={{marginLeft: '20px'}}
                      onClick={() => 
                      {
                        if(this.state.column_toggles_top < -80)
                          this.setState({column_toggles_top: -80});
                        else
                          this.setState({column_toggles_top: -200});
                      }}
                    >
                  Toggle Filters
                    </CustomButton>
                  </Row>
                </Part>
              </div>
            </Transition>

            {/* List of Enquiries */}
            {this.props.accommodationBookings.length === 0 ? (
              <Message danger text='No enquiries were found in the system' style={{marginTop: '145px'}} />
            ) : (
              <div style={{maxHeight: 'auto', marginTop: '10px', backgroundColor: '#2BE8A2'}}>
                <BootstrapTable
                  id='tblAccommodationBookings'
                  key='tblAccommodationBookings'
                  data={enquiries}
                  striped
                  hover
                  insertRow={false}
                  // selectRow={(row)=>alert(row)}
                  selectRow={{bgColor: 'red'}}
                  expandableRow={this.isExpandableRow}
                  expandComponent={this.expandComponent}
                  trStyle={(row) => ({background: 'lightblue'})}
                  expandColumnOptions={{
                    expandColumnVisible: true,
                    expandColumnComponent: this.expandColumnComponent,
                    columnWidth: 50}}
                  cellEdit={cellEditProp}
                  dataFormatter={clientFormatter}
                  options={options}
                  pagination
                  // onScroll={}
                  version='4' // bootstrap version
                >
                  <TableHeaderColumn  
                    // isKey
                    dataField='_id'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed', left: '190px', background: 'lime'}}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_id_visible}
                  > Enquiry ID
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    isKey
                    dataField='object_number'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={() => {this.state.col_id_visible?({position: 'fixed', background: 'red' }):({background: 'lime'})}}
                    // thStyle={this.state.col_id_visible?{position: 'fixed', left: '400px',background: 'lime'}:{position: 'fixed', background: 'red'}}
                    // thStyle={{position: 'fixed', left: this.state.col_id_end + 'px', background: 'lime'}}
                    tdStyle={() => {({'fontWeight': 'lighter'})}}
                    hidden={!this.state.col_object_number_visible}
                  > Enquiry Number
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='client_name'
                    dataSort
                    caretRender={this.getCaret}
                    // editable={{type: 'select'}}
                    customEditor={{
                      getElement: (func, props) =>
                        <ComboBox items={this.props.clients} selected_item={props.row.client} label='client_name' />
                    }}
                    // thStyle={{position: 'fixed', left: this.state.col_id_end + 240 + 'px', background: 'lime'}}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_client_id_visible}
                  > Client
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='contact_person'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_contact_person_id_visible}
                    customEditor={{
                      getElement: (func, props) =>
                        <ComboBox items={this.props.users} selected_item={props.row.contact} label='name' />
                    }}
                  > Contact Person
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='sitename'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    customEditor={{
                      getElement: (func, props) => (
                        <input
                          type='text'
                          defaultValue={props.row.sitename}
                          onChange={(val) => {
                            const sel_quo = props.row;
                            sel_quo.sitename = val.currentTarget.value;
                            this.setState( { selected_enquiry: sel_quo })
                          }}
                          onKeyPress={(evt) => this.handleEnquiryUpdate(evt, props.row)}
                        />)
                    }}
                    hidden={!this.state.col_sitename_visible}
                  > Sitename
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='request'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    customEditor={{
                      getElement: (func, props) => (
                        <input
                          type='text'
                          defaultValue={props.row.request}
                          onChange={(val) => {
                            const sel_quo = props.row;
                            sel_quo.request = val.currentTarget.value;
                            this.setState( { selected_enquiry: sel_quo })
                          }}
                          onKeyPress={(evt) => this.handleEnquiryUpdate(evt, props.row)}
                        />)
                    }}
                    hidden={!this.state.col_request_visible}
                  >Request
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='vat'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_vat_visible}
                  > VAT
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='revision'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_revision_visible}
                  > Revision
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='status'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_status_visible}
                  > Status
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='creator_name'
                    dataSort
                    ref={this.creator_ref}
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed', right: this.width, border: 'none' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_creator_visible}
                  > Creator
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='date_logged'
                    dataSort
                    caretRender={this.getCaret}
                    // thStyle={{position: 'fixed', right: '-20px', border: 'none' }}
                    tdStyle={{'fontWeight': 'lighter'}}
                    hidden={!this.state.col_date_logged_visible}
                  > Date Logged
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            )}
          </div>
        </div>
      </PageContent>
    );
  }
}

// PropTypes Validation
Enquiries.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  // changeTab: PropTypes.func.isRequired,
  accommodationBookings: PropTypes.arrayOf(PropTypes.object).isRequired
};

// Map state to props & Export
const mapStateToProps = state => (
{
  accommodationBookings: getAccommodationBookings(state)
});

export default compose(
  connect(mapStateToProps),
  _withFadeInAnimation
)(Enquiries);
