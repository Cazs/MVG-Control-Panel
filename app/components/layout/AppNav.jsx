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
    title: 'Trip Bookings',
    name: 'trip-bookings',
    icon: 'ios-airplane',
  },
  {
    title: 'Accommodation Bookings',
    name: 'accommodation-bookings',
    icon: 'ios-bed',
  },
  /*{
    title: 'Trip History',
    name: 'trip-history',
    icon: 'ios-car',
  },
  {
    title: 'Accommodation History',
    name: 'accommodation-history',
    icon: 'ios-briefcase',
  },*/
  {
    title: 'Messages',
    name: 'messages',
    icon: 'ios-chatbubbles',
  },
  {
    title: 'Settings',
    name: 'settings',
    icon: 'ios-cog',
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
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  background: #363E47;
  margin-top: 45px;
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
  height: 90px;
  &:hover {
    color: #fff;
    background: radial-gradient(circle 170px, #3c3c3c, #111417);
    text-decoration: none;
  }
`;

export const TabTitle = styled.div`
  position: absolute;
  margin-top: 30px;
  font-size: 9pt;
  text-align:center;
  font-weight:100;
  display:block;
`;

export const Icon = styled.i`
  ${props => props.id === 'trip-bookings' && `color: #40FF9A;`};
  ${props => props.id === 'accommodation-bookings' && `color: #40FF9A;`};
  ${props => props.id === 'trip-history' && `color: #469fe5;`};
  ${props => props.id === 'accommodation-history' && `color: #C4C8CC;`};
  ${props => props.id === 'messages' && `color: #cbc189;`};
  ${props => props.id === 'settings' && `color: #cbc189;`};
`;

export const ActiveIndicator = styled.div`
  height: ${allTabs.length * 90}px;
  width: 5px;
  position: absolute;
  > div {
    position: absolute;
    background: #292b2c;
    width: 100px;
    border-left: 5px solid #469fe5;
    border-bottom: 1px solid #3e3e3e;
    border-top: 1px solid #3e3e3e;
  }
`;

export const NavIcon = styled.div`
  width: 60px;
  height: 40px;
  ${props => `background: url(../static/images/icons/${props.icon}.svg);`}
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  &:hover
  {
    // background-color: red;
  }
`;

function AppNav({ activeTab, changeTab })
{
  const marginTopValue = setMarginValue(activeTab);
  const allTabsComponent = allTabs.map(tab => (
    <Tab key={tab.name} href="#" onClick={() => changeTab(tab.name)}>
      {/* <Icon id={tab.name} className={tab.icon} /> */}
      <NavIcon id={tab.name} icon={tab.icon} />
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
