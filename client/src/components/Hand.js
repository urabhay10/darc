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
                    <div
                        className="card"
                        key={card.id}
                        onClick={() => { console.log('picked'); this.props.pickcard(card); }}
                        style={{
                            boxShadow: this.props.pickedcard?.id === card.id? "0 0 10px rgba(255, 255, 255, 0.5)" : "none",
                            transform: this.props.pickedcard?.id === card.id ? "scale(1.25)" : "scale(1)"
                        }}
                    >
                        <Card text={card.name} cardid={card.cardid}/>
                    </div>
                ))}
            </div>
        )
    }
}
