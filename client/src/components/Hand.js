import React, { Component } from 'react'
import Card from './Card';

export default class Hand extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hand:[{},{},{},{},{},{}]
        };
      }
    render() {
        return (
            <div style={{
                height: '80px',
                width: '496px',
                backgroundColor: '#cb6ce6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
                {this.state.hand.map((card) => (
                        <div className="card" key={this.state.hand.indexOf(card)}>
                            <Card />
                        </div>
                    ))}
            </div>
        )
    }
}
