import React, { Component } from 'react'

export default class InfoBox extends Component {
  render() {
    return (
      <div style={{
        height: '464px',
        width: '360px',
        backgroundColor: 'rgb(207, 101, 118)',
        border: '1px solid white',
        position: 'absolute',
        top: '100px',
        left: '56px',
      }}>
        <div style={{
          margin: '10px',
          backgroundColor: 'orange',
          height: '444px',
          width: '340px',
          boxShadow: '0px 0px 10px orange',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <div style={{
            width: '340px',
            backgroundColor: '#c5bb47',
            fontWeight: '800'
          }}>
            Information
          </div>
          <div style={{
            backgroundColor: 'blanchedalmond'
          }}>Select a card to view it's name</div>
          <div style={{
            backgroundColor: 'burlywood'
          }}>Select a card to view it's abilities</div>
          <div style={{
            backgroundColor: 'darkgoldenrod'
          }}>Select a card to view it's strength</div>
          <div style={{
            backgroundColor: 'cornsilk'
          }}>Select a card to view it's restriction</div>
          <div style={{
            position: 'relative',
            top: '16px',
            height: '80px',
            lineHeight: '16px',
            backgroundColor: 'greenyellow',
            width: '300px',
            textAlign: 'center',
            alignSelf: 'center',
            boxShadow: '0px 0px 10px green',
            border: '1px solid green',
          }}>Place to let you know what's going on</div>
        </div>
      </div>
    )
  }
}
