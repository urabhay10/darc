import React, { Component } from 'react'
import Card from './Card';

export default class OpponentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opponentTable: [{}, {}, {}, {}, {}]
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
        {this.state.opponentTable.map((card) => (
          <div className="card" key={this.state.opponentTable.indexOf(card)}>
            <Card placeholder text='queen'/>
          </div>
        ))}
      </div>
    )
  }
}
