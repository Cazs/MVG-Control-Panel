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
import
{
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '../../components/shared/Layout';
import _withFadeInAnimation from '../../components/shared/hoc/_withFadeInAnimation';

// Component
class Home extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { };
  }

  // Render Main Content

  render()
  {
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Home</PageHeaderTitle>
          <PageHeaderActions ref={this.header_actions}>
            <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
              {/* <Button primary>
                New Enquiry
              </Button> */}
            </div>
          </PageHeaderActions>
        </PageHeader>
        <PageContent>
          <button
            style={{marginTop: '300px'}}
            onClick={() => this.props.changeTab('enquiries')}
          >Show&nbsp;Dashboard
          </button>
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Home.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
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
