import React, { Component } from 'react'
import Card from './Card';

export default class Hand extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
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
                {this.props.hand.map((card) => (
                        <div className="card" key={this.props.hand.indexOf(card)} onClick={()=>{console.log('picked');this.props.pickcard(card);}}>
                            <Card/>
                        </div>
                    ))}
            </div>
        )
    }
}
