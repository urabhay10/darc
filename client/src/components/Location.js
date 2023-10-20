import React, { Component } from 'react'

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponentheight: this.props.opponentstrength+'%',
      yourheight: this.props.yourstrength+'%',
      emptyspaceheight: (100-this.props.yourstrength-this.props.opponentstrength)+'%'
    };
  }
  render() {
    return (
      <div style={{
        height: '192px',
        width: '240px',
        backgroundColor: 'purple',
        lineHeight: '192px',
        fontSize: '14.5px',
        fontWeight: 800,
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '15px',
          color: 'white'
        }}>
          Occupy half of this area to win
        </div>
        <div style={{
          height: this.state.opponentheight,
          backgroundColor:'#ff5757'
        }}></div>
        <div style={{
          height: this.state.emptyspaceheight,
          visibility: 'hidden'
        }}></div>
        <div style={{
          height: this.state.yourheight,
          backgroundColor:'#ff66c4',
        }}></div>
      </div>
    )
  }
}
