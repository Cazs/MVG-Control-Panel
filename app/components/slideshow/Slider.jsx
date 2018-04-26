import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slide from './Slide'
import Dots from './dots/dots'
import LeftArrow from './arrows/left-arrow'
import RightArrow from './arrows/right-arrow'
import PropTypes from 'prop-types';
require('./style.scss')

import Transition from 'react-motion-ui-pack'

const { BrowserWindow } = require('electron').remote;
const appConfig = require('electron-settings');
const mainWindowID = appConfig.get('mainWindowID');
const mainWindow = BrowserWindow.fromId(mainWindowID);

class Slider extends Component
{
  constructor(props)
  {
    super(props)
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this);
    this.handleDotClick = this.handleDotClick.bind(this);

    this.state =
    {
      settingsVisible: false,
      autoplay: true,
      translateValue: 0,
      index: props.index
    }
  }

  componentDidMount()
  {
    if(this.state.autoplay)
    {
      window.setInterval(() =>
        {
          this.goToNextSlide()
        }, 3000);
    }
  }

  componentDidUpdate(prevProps, prevState)
  {
    // const { autoplay } = this.state

    // if(autoplay && prevState.autoplay !== autoplay)
    // {
    //   const x = window.setInterval(() =>
    //   {
    //             this.goToNextSlide()
    //           }, 3000)
    //   // this.setState({ interval : x })
    //   this.state.interval = x;
    // }
    // else if(!autoplay && prevState.autoplay !== autoplay)
    // {
    //   const x = window.clearInterval(this.state.interval)
    //   // this.setState({ interval : x })
    //   this.state.interval = x;
    // }
  }

  toggleSettings() { this.setState({ settingsVisible: !this.state.settingsVisible }) }
  toggleAutoplay() { this.setState({ autoplay: !this.state.autoplay }) }

  render() 
  {
    const { settingsVisible, autoplay } = this.state
    const {
      images,
      translateValue,
      showDots,
      coolButtons
    } = this.props;

    return (
      <div className="slider">
        {/* <Settings
          visible={settingsVisible}
          toggleAutoplay={this.toggleAutoplay}
          autoplay={autoplay}
        />
        <ToggleSettings visible={settingsVisible} toggle={this.toggleSettings} /> */}
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${this.state.translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}
        >
          {/* { this.renderSlides(images) } */}
          <Slide key={this.state.index} image={images[this.state.index]} />)
        </div>

        <Dots
          visible={showDots}
          index={this.state.index}
          images={images}
          dotClick={this.handleDotClick}
        />

        <LeftArrow prevSlide={this.goToPreviousSlide} coolButtons={coolButtons} />
        <RightArrow nextSlide={this.goToNextSlide} coolButtons={coolButtons} />
      </div>
    )
  }

  goToNextSlide()
  {
    this.setState({index: this.state.index + 1 >= this.props.images.length ? 0 : this.state.index + 1});
  }

  goToPreviousSlide()
  {
    
    console.log(mainWindow.getSize());
    this.setState(
      {
        // translateValue: this.state.translateValue + mainWindow.getSize()[0],
        index: this.state.index - 1 < 0 ? this.props.images.length-1 : this.state.index - 1
      });
  }

  handleDotClick(i)
  {
    this.setState({index: i});
  }

  slideWidth() { document.querySelector('.slide').clientWidth }

}

// PropTypes Validation
Slider.propTypes =
{
  dispatch: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired
};

// Map state to props & Export
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Slider)
