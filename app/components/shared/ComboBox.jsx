import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ComboBox extends React.Component
{
    constructor(props)
    {
      super(props);
      this.updateData = this.updateData.bind(this);
      this.state = 
        { 
          selected_item: props.defaultValue
        };
    }
    
    updateData(value) {
      // this.props.onUpdate({ selected_item: this.state.selected_item });
      this.props.onUpdate(value);
    }

    render() {
      return (
        <span>
          <select
            defaultValue={this.props.value ? this.props.value :  this.props.items[0]}
            onKeyDown={this.props.onKeyDown}
            onChange={(ev) =>
                      {
                        console.log('ComboBox> selected: ', ev.currentTarget.value);
                        this.updateData(ev.currentTarget.value);
                      }}
          >
            {
              this.props.items ? 
                this.props.items.map(item =>
                  (<option
                      key={item._id}
                      value={this.props.label ? item[this.props.label] : item}
                      // value={typeof this.props.label == undefined ? item: item[this.props.label]}
                      // selected={this.props.value ? item[this.props.label] === this.props.value : false}
                    >
                      { this.props.label ? item[this.props.label] : item }
                    </option>)
                  ) : (<option />)
            }
          </select>
        </span>
      );
    }
  }

  ComboBox.propTypes =
  {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    // value: PropTypes.object.isRequired,
    // label: PropTypes.string.isRequired
  };

  export default ComboBox;