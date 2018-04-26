// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';

// Animation
import { Motion, spring } from 'react-motion';

const springConfig =
{
  stiffness: 350,
  damping: 18,
  precision: 0.01,
};

const setMarginValue = activeTab =>
{
  const multiplier = 100 / allTabs.length;
  const activeTabIndex = findIndex(allTabs, { name: activeTab });
  return activeTabIndex * multiplier;
};

const allTabs =
[
  {
    title: 'Enquiries',
    name: 'enquiries',
    icon: 'ion-clock', // ios-briefcase md-cog
  },
  {
    title: 'Quotes',
    name: 'quotes',
    icon: 'ion-clipboard',
  },
  {
    title: 'Trips',
    name: 'trips',
    icon: 'ion-calculator',
  },
  {
    title: 'Invoices',
    name: 'invoices',
    icon: 'ion-ios-body',
  },
  {
    title: 'Messages',
    name: 'messages',
    icon: 'ion-calendar',
  },
  {
    title: 'Settings',
    name: 'settings',
    icon: 'ion-ios-gear',
  }
];

// Styles
import styled from 'styled-components';

export const SideBar = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 80px;
  min-width: 80px;
  max-width: 80px;
  background: #2c323a;
  margin-top: 43px;
  -webkit-box-shadow: 7px 0px 17px #3c3c3c;
`;

export const Tab = styled.a`
  position: relative;
  color: white;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1.5;
  text-decoration: none;
  height: 60px;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

export const TabTitle = styled.div`
  position: absolute;
  margin-top: 20px;
  font-size: 9pt;
  text-align:center;
  font-weight:100;
  display:block;
`;

export const Icon = styled.i`
  ${props => props.id === 'enquiries' && `color: #40FF9A;`};
  ${props => props.id === 'quotes' && `color: #469fe5;`};
  ${props => props.id === 'trips' && `color: #C4C8CC;`};
  ${props => props.id === 'invoices' && `color: #E84906;`};
  ${props => props.id === 'messages' && `color: #cbc189;`};
  ${props => props.id === 'settings' && `color: #cbc189;`};
`;

export const ActiveIndicator = styled.div`
  height: ${allTabs.length * 60}px;
  width: 5px;
  position: absolute;
  > div {
    position: absolute;
    background: #292b2c;
    width: 80px;
    border-left: 5px solid #469fe5;
    border-bottom: 1px solid #3e3e3e;
    border-top: 1px solid #3e3e3e;
  }
`;

function AppNav({ activeTab, changeTab })
{
  const marginTopValue = setMarginValue(activeTab);
  const allTabsComponent = allTabs.map(tab => (
    <Tab key={tab.name} href="#" onClick={() => changeTab(tab.name)}>
      <Icon id={tab.name} className={tab.icon} />
      <TabTitle>{tab.title}</TabTitle>
    </Tab>
  ));
  return (
    <SideBar>
      <div>
        <Motion style={{ marginTop: spring(marginTopValue, springConfig) }}>
          {({ marginTop }) => (
            <ActiveIndicator>
              <div
                style={{
                  height: `${100 / allTabs.length}%`,
                  top: `${marginTop}%`,
                }}
              />
            </ActiveIndicator>
          )}
        </Motion>
        {allTabsComponent}
      </div>
    </SideBar>
  );
}

AppNav.propTypes =
{
  activeTab: PropTypes.string.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default AppNav;
