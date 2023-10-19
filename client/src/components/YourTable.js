import React, { Component } from 'react'
import Card from './Card';

export default class YourTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourTable: [{}, {}, {}, {}, {}]
    };
  }
  render() {
    return (
      <div style={{
        height: '192px',
        width: '512px',
        backgroundColor: '#c1ff72',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        {this.state.yourTable.map((card) => (
          <div className="card" key={this.state.yourTable.indexOf(card)}>
            <Card placeholder text='king'/>
          </div>
        ))}
      </div>
    )
  }
}
