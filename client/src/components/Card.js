import React, { Component } from 'react'

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
          height: this.props.height?this.props.height*48:48,
          width: this.props.width?this.props.width*32:32,
          color: this.props.placeholder?'pink':'#ffde59',
          border: this.props.placeholder?'1px dotted black':'none',
        };
      }
  render() {
    return (
      <div style={{
        width: this.state.width+'px',
        height: this.state.height+'px',
        backgroundColor: this.state.color,
        border: this.state.border,
        fontSize: '10px',
      }}>
        {this.props.text}
      </div>
    )
  }
}
