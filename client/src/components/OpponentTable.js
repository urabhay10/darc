import React, { Component } from 'react'
import Card from './Card';

export default class OpponentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <div style={{
        height: '192px',
        width: '416px',
        backgroundColor: '#5ce1e6',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {this.props.opponentTable.map((card) => (
          <div className="card" key={this.props.opponentTable.indexOf(card)}>
            <Card placeholder={card.placeholder} text={card.placetype}/>
          </div>
        ))}
      </div>
    )
  }
}
