import React, { Component } from 'react'

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div style={{
        width: this.props.width ? this.props.width * 32 : 32 + 'px',
        height: this.props.height ? this.props.height * 48 : 48 + 'px',
        backgroundColor: this.props.color ? this.props.color: this.props.placeholder ? 'pink' : this.props.cardid === '0001' ? '#FFD700' : ' #FF0000',
        border: this.props.placeholder ? '1px dotted black' : 'none',
        fontSize: this.props.fontSize? this.props.fontSize*10+'px':'10px',
        color: this.props.textColor ? this.props.textColor : 'black',
      }}>
        {this.props.text}
      </div>
    )
  }
}
