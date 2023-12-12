import React, { Component } from 'react'

export default class  InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedcard: this.props.pickedcard,
    };
  }
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
          }}>{this.props.pickedcard.name === undefined  ? `Select a card to view it's name` : `${this.props.pickedcard.name}`}</div>
          <div style={{
            backgroundColor: 'burlywood'
          }}>{this.props.pickedcard.abilitytext === undefined ? `Select a card to view it's abilities` : `${this.props.pickedcard.abilitytext}`}</div>
          <div style={{
            backgroundColor: 'darkgoldenrod'
          }}>{this.props.pickedcard.strength === undefined ? `Select a card to view it's strength` : `${this.props.pickedcard.strength}`}</div>
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
          }}>{this.props.log}</div>

          {this.props.timer>=0 && this.props.timer!==null ? <div style={{
            backgroundColor: 'lightblue',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: '0px',
            position: 'absolute',
            width: '340px'
          }}>Time remaining: {this.props.timer} seconds</div> :<></>}
        </div>
      </div>
    )
  }
}
