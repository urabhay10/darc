import React, { Component } from 'react'

export default class Opponent extends Component {
  render() {
    return (
      <div style={{
        height: '80px',
        width: '80px',
        fontWeight: 900,
        backgroundColor: '#ff5757',
        textAlign: 'center',
        lineHeight: '20px',
        fontSize: '10px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>{this.props.username}</div>
    )
  }
}