import React, { Component } from 'react'
import Card from './Card';

export default class YourTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
        {this.props.yourTable.map((card) => (
          <div className="card" key={this.props.yourTable.indexOf(card)}>
            <Card placeholder={card.placeholder} text={card.placetype}/>
          </div>
        ))}
      </div>
    )
  }
}
