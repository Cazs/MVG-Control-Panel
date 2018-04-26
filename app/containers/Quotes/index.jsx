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

// Tab content Components
import QuotesTabContent from './QuotesTabContent';

// Component
class Quotes extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { visibleTab: 'Quotes' };
    this.header_actions = React.createRef();
  }

  // Switch Tab
  changeTab(tabNum)
  {
    this.setState({ visibleTab: tabNum });
  }

  // Render Main Content

  render()
  {
    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>Quotes | {this.state.visibleTab}</PageHeaderTitle>
          <PageHeaderActions>
            <div style={{display: 'inline', float: 'right', marginTop: '-30px', paddingRight: '100px', borderBottom: '2px', borderColor: 'black'}}>
              <Button success onClick={()=>this.props.changeTab('home')}>
                Home
              </Button>
            </div>
          </PageHeaderActions>
          <Tabs style={{backgroundColor: 'lime', borderTop: '2px solid black', marginTop: '30px', zIndex: '90'}}>
            <Tab
              href="#"
              className={this.state.visibleTab === 'Quotes' ? 'active' : ''}
              onClick={() => this.changeTab('Quotes')}
            >
              Quotes
            </Tab>
          </Tabs>
        </PageHeader>
        <PageContent>
          
          <TabContent>
            {this.state.visibleTab === 'Quotes' && (
              <QuotesTabContent />
            )}
          </TabContent>
        </PageContent>
      </PageWrapper>
    );
  }
}

// PropTypes Validation
Quotes.propTypes =
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
)(Quotes);
